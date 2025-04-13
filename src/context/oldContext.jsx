import { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const DevconnectContext = createContext();

export function DevconnectProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [ownPosts, setOwnPosts] = useState([]);
    const [feed, setFeed] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [currentTab, setCurrentTab] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    // === Helpers ===
    const isAuthenticated = () => localStorage.getItem("token") !== null;

    const getAuthHeaders = () => ({
        'Authorization': localStorage.getItem("token"),
        'Content-Type': 'application/json'
    });

    // === Fetch Functions ===
    const fetchUser = useCallback(async () => {
        try {
            const res = await fetch('https://devconnectserver.onrender.com/api/v1/user/getUserDetails', {
                method: "GET",
                headers: getAuthHeaders()
            });
            if (!res.ok) throw new Error("Failed to fetch user details");
            const data = await res.json();
            setUser(data);
        } catch (err) {
            console.error("User fetch error:", err);
        }
    }, []);

    const fetchOwnPosts = useCallback(async () => {
        try {
            const res = await fetch('https://devconnectserver.onrender.com/api/v1/post/posts', {
                method: "GET",
                headers: getAuthHeaders()
            });
            const data = await res.json();
            setOwnPosts(data.posts || []);
        } catch (err) {
            console.error("Own posts fetch error:", err);
        }
    }, []);

    const fetchFeed = useCallback(async () => {
        try {
            const res = await fetch('https://devconnectserver.onrender.com/api/v1/post/feed', {
                method: "GET",
                headers: getAuthHeaders()
            });
            const data = await res.json();
            setFeed(data.feed || []);
        } catch (err) {
            console.error("Feed fetch error:", err);
        }
    }, []);

    const fetchSavedPosts = useCallback(async () => {
        try {
            const res = await fetch('https://devconnectserver.onrender.com/api/v1/post/saved', {
                method: "GET",
                headers: getAuthHeaders()
            });
            const data = await res.json();
            setSavedPosts(data.savedPosts || []);
        } catch (err) {
            console.error("Saved posts fetch error:", err);
        }
    }, []);

    // === Combined Fetch on Login ===
    const initializeData = useCallback(() => {
        fetchUser();
        fetchOwnPosts();
        fetchFeed();
        fetchSavedPosts();
    }, [fetchUser, fetchOwnPosts, fetchFeed, fetchSavedPosts]);

    // === useEffect ===
    useEffect(() => {
        if (isAuthenticated()) {
            initializeData();
        }
    }, [loggedIn, initializeData]);

    // === Auth Handlers ===
    const signupHandler = async (username, email, password, name, bio, profileImage) => {
        try {
            const res = await fetch('https://devconnectserver.onrender.com/api/v1/user/signup', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, name, bio, profileImage })
            });

            const data = await res.json();
            if (data.newUser) {
                alert("✅ Signup successful. Please sign in.");
                navigate("/auth/signin");
            } else {
                alert("❌ Signup failed!");
            }
        } catch (err) {
            console.error(err);
            alert("❌ Signup error!");
        }
    };

    const signinHandler = async (username, password) => {
        try {
            const res = await fetch('https://devconnectserver.onrender.com/api/v1/user/signin', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();
            if (data.token) {
                localStorage.setItem("token", data.token);
                setLoggedIn(true);
                setCurrentTab("home");
                alert("✅ Logged in!");
                navigate("/home");
            } else {
                alert("❌ Invalid credentials!");
            }
        } catch (err) {
            console.error(err);
            alert("❌ Signin error!");
        }
    };

    const logoutHandler = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
        setUser(null);
        setOwnPosts([]);
        setFeed([]);
        setSavedPosts([]);
        navigate("/auth/signin");
        alert("👋 Logged out!");
    };

    // === Post Handlers ===
    const postHandler = async (content, imageUrl) => {
        try {
            const res = await fetch('https://devconnectserver.onrender.com/api/v1/post/createPost', {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify({ content, imageUrl })
            });

            const data = await res.json();
            if (data.newPost) {
                alert("✅ Post created!");
                setOwnPosts(prev => [data.newPost, ...prev]);
                setFeed(prev => [data.newPost, ...prev]);
            } else {
                alert("❌ Post creation failed!");
            }
        } catch (err) {
            console.error("Post creation error:", err);
        }
    };

    const likePostHandler = async (postId, setLiked) => {
        try {
            const res = await fetch(`https://devconnectserver.onrender.com/api/v1/post/likepost/${postId}`, {
                method: "PUT",
                headers: getAuthHeaders()
            });

            const data = await res.json();
            setLiked(data.message === "Post Liked");
        } catch (err) {
            console.error("Like error:", err);
        }
    };

    const savePostHandler = async (postId) => {
        try {
            const res = await fetch(`https://devconnectserver.onrender.com/api/v1/post/savePost/${postId}`, {
                method: "PUT",
                headers: getAuthHeaders()
            });

            const data = await res.json();
            if (data.message === "Saved Post" || data.message === "Unsaved Post") {
                await fetchSavedPosts();
                await fetchUser();
                return data.message === "Saved Post";
            }
        } catch (err) {
            console.error("Save post error:", err);
        }
        return null;
    };

    return (
        <DevconnectContext.Provider
            value={{
                isAuthenticated,
                currentTab,
                setCurrentTab,
                loggedIn,
                setLoggedIn,
                signupHandler,
                signinHandler,
                logoutHandler,
                user,
                ownPosts,
                feed,
                savedPosts,
                likePostHandler,
                savePostHandler,
                postHandler,
                fetchSavedPosts,
                fetchUser,
                fetchOwnPosts,
                fetchFeed
            }}
        >
            {children}
        </DevconnectContext.Provider>
    );
}


import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const DevconnectContext = createContext();
export function DevconnectProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [ownPosts, setOwnPosts] = useState(null);
    const [feed, setFeed] = useState(null);
    const [currentTab, setCurrentTab] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [savedPosts, setSavedPosts] = useState(null);
    const [likedPosts, setLikedPosts] = useState([]);
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

    const getLikedPosts = useCallback(async () => {
        try {
            const res = await fetch("https://devconnectserver.onrender.com/api/v1/post/liked", {
                method: "GET",
                headers: getAuthHeaders(),
            });

            const data = await res.json();
            setLikedPosts(data.posts || []);
        } catch (error) {
            console.error("Failed to fetch liked posts", error);
        }
    },[])

    // New function to synchronize post data across all collections
    const syncPostData = useCallback((postId, updateFn) => {
        // Update post in feed
        setFeed(prev =>
            prev?.map(post => post._id === postId ? updateFn(post) : post) || []
        );

        // Update post in ownPosts
        setOwnPosts(prev =>
            prev?.map(post => post._id === postId ? updateFn(post) : post) || []
        );

        // Update post in savedPosts
        setSavedPosts(prev =>
            prev?.map(post => post._id === postId ? updateFn(post) : post) || []
        );
    }, []);

    // === Combined Fetch on Login ===
    const initializeData = useCallback(() => {
        fetchUser();
        fetchOwnPosts();
        fetchFeed();
        fetchSavedPosts();
        getLikedPosts();
    }, [fetchUser, fetchOwnPosts, fetchFeed, fetchSavedPosts,getLikedPosts]);

    // === useEffect ===
    useEffect(() => {
        if (isAuthenticated()) {
            initializeData();
        }
    }, [loggedIn, initializeData]);

    async function signupHandler(username, email, password, name, bio, profileImage) {
        try {
            const res = await fetch('https://devconnectserver.onrender.com/api/v1/user/signup', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, name, bio, profileImage })
            });
            const data = await res.json();
            if (data.newUser) {
                alert('✅ User signed up! Please sign in.');
                navigate('/auth/signin');
            } else {
                alert('❌ Signup failed! Try again.');
            }
        } catch (err) {
            console.error(err);
            alert('❌ Error during signup!');
        }
    }

    async function signinHandler(username, password) {
        try {
            const res = await fetch('https://devconnectserver.onrender.com/api/v1/user/signin', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                setLoggedIn(true);
                setCurrentTab('home');
                alert('✅ Signed in successfully!');
                navigate('/home');
            } else {
                alert('❌ Signin failed! Invalid credentials.');
            }
        } catch (err) {
            console.error(err);
            alert('❌ Error during signin!');
        }
    }

    async function likePostHandler(postId, setLiked) {
        try {
            const res = await fetch(`https://devconnectserver.onrender.com/api/v1/post/likepost/${postId}`, {
                method: "PUT",
                headers: getAuthHeaders()
            });

            const data = await res.json();
            const isLiked = data.message === 'Post Liked';

            if (data.message === 'Post Liked' || data.message === 'Removed Like') {
                // Update post across all collections
                syncPostData(postId, (post) => {
                    const updatedLikes = isLiked
                        ? [...(post.likes || []), { _id: user.id }]
                        : (post.likes || []).filter(like => like._id !== user.id);

                    return { ...post, likes: updatedLikes };
                });

                if (setLiked) setLiked(isLiked);
                return isLiked;
            } else {
                alert('❌ Failed to update like status.');
                return null;
            }
        } catch (err) {
            console.error('Error liking post:', err);
            alert('❌ Error while liking/unliking post!');
            return null;
        }
    }

    async function savePostHandler(postId) {
        try {
            const res = await fetch(`https://devconnectserver.onrender.com/api/v1/post/savePost/${postId}`, {
                method: "PUT",
                headers: getAuthHeaders()
            });

            const data = await res.json();
            const isSaved = data.message === 'Saved Post';

            if (data.message === 'Saved Post' || data.message === 'Unsaved Post') {
                if (isSaved) {
                    // If the post was saved, find it in feed or ownPosts and add to savedPosts if not already there
                    const postToSave = feed?.find(p => p._id === postId) ||
                        ownPosts?.find(p => p._id === postId);

                    if (postToSave && !savedPosts?.some(p => p._id === postId)) {
                        setSavedPosts(prev => [...(prev || []), postToSave]);
                    }
                } else {
                    // If unsaved, remove from savedPosts
                    setSavedPosts(prev => (prev || []).filter(p => p._id !== postId));
                }

                await refreshUser();
                return isSaved;
            } else {
                alert('❌ Failed to update save status.');
                return null;
            }
        } catch (err) {
            console.error('Error saving post:', err);
            alert('❌ Error while saving/unsaving post!');
            return null;
        }
    }

    async function postHandler(content, imageUrl) {
        try {
            const res = await fetch('https://devconnectserver.onrender.com/api/v1/post/createPost/', {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify({ content, imageUrl })
            });
            const data = await res.json();
            if (data.newPost) {
                alert('✅ Post created successfully!');
                // Refresh own posts and feed
                setOwnPosts(prev => [data.newPost, ...(prev || [])]);
                setFeed(prev => [data.newPost, ...(prev || [])]);
            } else {
                console.log(data);
                alert('❌ Post creation failed!');
            }
        } catch (err) {
            console.error(`Error posting:`, err);
            alert('❌ Error occurred while creating post!');
        }
    }

    async function getSavedPosts() {
        try {
            const res = await fetch('https://devconnectserver.onrender.com/api/v1/post/saved', {
                method: "GET",
                headers: getAuthHeaders()
            });
            const data = await res.json();
            setSavedPosts(data.savedPosts);
        }
        catch (err) {
            console.error('Error Fetching saved Posts!!');
        }
    }

    function logoutHandler() {
        localStorage.removeItem('token');
        setLoggedIn(false);
        setUser(null);
        setOwnPosts(null);
        setFeed(null);
        setSavedPosts(null);
        navigate('/auth/signin', { replace: true });
        alert('👋 Logged out successfully!');
    }

    async function refreshUser() {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': token,
                'Content-Type': 'application/json',
            };
            const userRes = await fetch('https://devconnectserver.onrender.com/api/v1/user/getUserDetails', {
                method: "GET",
                headers
            });
            if (!userRes.ok) throw new Error('Failed to refresh user details');
            const userData = await userRes.json();
            setUser(userData);
        } catch (err) {
            console.error('Failed to refresh user:', err);
        }
    }

    async function updateUserProfile(updatedData) {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': token,
                'Content-Type': 'application/json',
            };
            const userRes = await fetch('https://devconnectserver.onrender.com/api/v1/user/updateUserDetails', {
                method: "PUT",
                headers,
                body: JSON.stringify(updatedData),
            });

            if (!userRes.ok) throw new Error('Failed to update user details');

            const { data } = await userRes.json();
            setUser(data); // update global state
        } catch (err) {
            console.error('Failed to update user:', err);
            throw err;
        }
    }


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
                likePostHandler,
                postHandler,
                savePostHandler,
                getSavedPosts,
                savedPosts,
                refreshUser,
                syncPostData,
                fetchFeed,
                fetchSavedPosts,
                updateUserProfile,
                fetchOwnPosts,
                likedPosts
            }}
        >
            {children}
        </DevconnectContext.Provider>
    );
}



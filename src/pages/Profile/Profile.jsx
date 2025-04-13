import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OwnPosts from "../../components/OwnPosts";
import LikedPosts from '../../components/LikedPosts';


export default function Profile() {
    const [user, setUser] = useState(null);
    const [active, setActive] = useState('posts');
    const navigate = useNavigate();

    useEffect(() => {
        setUser(null);
        async function fetchData() {
            try {
                const res = await fetch('https://devconnectserver.onrender.com/api/v1/user/getUserDetails', {
                    method: "GET",
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }
                });
                const data = await res.json();
                setUser(data);
            } catch (err) {
                setUser(undefined);
            }
        }
        fetchData();
    }, []);

    if (user === null) {
        return <p className="text-center text-gray-500 mt-10">Loading...</p>
    }

    if (user === undefined) {
        return <p className="text-center text-red-500 mt-10">Failed to load user info.</p>
    }

    const profileImage = user.profileImage;

    return (
        <>
            <div className="w-full md:w-3/5 lg:w-1/2 mx-auto border border-gray-200 rounded-lg p-6 mt-10">
                {/* Profile Info icon/name/username edit profile */}
                <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center">
                        <img src={profileImage} alt='' className="w-14 h-14 rounded-full object-cover" />
                        <div className="mx-5">
                            <p className="font-semibold text-xl sm:text-2xl">{user?.name}</p>
                            <p className="text-gray-500">@{user?.username?.toLowerCase()}</p>
                        </div>
                    </div>
                    <div>
                        <button className=" rounded-md px-2 py-2 sm:px-5 sm:py-2 bg-[#3949ab] text-white hover:bg-[#303f9f] transition self-end md:self-auto cursor-pointer" onClick={() => navigate('/editProfile')}>Edit Profile</button>
                    </div>
                </div>
                <hr className="border-1 border-gray-400" />
                {/* Posts/Followers/Following */}
                <div>
                    <div className="flex justify-between text-center mt-5 mb-3">
                        <p className="text-md text-gray-500 sm:text-xl"><span className="font-bold text-black">{user?.postCount}</span> Posts</p>
                        <p className="text-md text-gray-500 sm:text-xl"><span className="font-bold text-black">{user?.followersCount}</span> Followers</p>
                        <p className="text-md text-gray-500 sm:text-xl"><span className="font-bold text-black">{user?.followingCount}</span> Following</p>
                    </div>
                </div>
            </div>

            {/* Buttons - posts/liked posts */}
            <div className="w-full md:w-3/5 lg:w-1/2 mx-auto border border-gray-200 rounded-lg p-1 bg-gray-100 rounded-lg flex gap-4 mt-5">
                <button
                    className={`w-[50%] p-3 rounded-lg cursor-pointer transition ${active === 'posts' ? "bg-white font-bold" : "bg-gray-100 text-gray-600"}`}
                    onClick={() => setActive('posts')}
                >
                    Posts
                </button>
                <button
                    className={`w-[50%] p-2 rounded-lg cursor-pointer transition ${active === 'liked' ? "bg-white font-bold" : "bg-gray-100 text-gray-600"}`}
                    onClick={() => setActive('liked')}
                >
                    Liked Posts
                </button>
            </div>

            {/* Posts */}
            {/* <div className="w-full md:w-3/5 lg:w-1/2 mx-auto mt-5">
                {active === 'posts' && <OwnPosts />}
                {active === 'liked' && (
                    <div className="bg-white rounded-lg p-6">
                        <p className="text-gray-500 text-center">No liked posts to show yet!</p>
                    </div>
                )}
            </div> */}
            <div className="w-full md:w-3/5 lg:w-1/2 mx-auto mt-5">
                {active === 'posts' && <OwnPosts />}
                {active === 'liked' && <LikedPosts />}
            </div>



        </>
    );
}

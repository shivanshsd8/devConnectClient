import { useContext, useEffect, useState } from "react";
import PostCard from "./PostCard"; // assuming PostCard displays a single post
import { DevconnectContext } from "../context/DevconnectContext";

export default function LikedPosts() {
    const {likedPosts}  = useContext(DevconnectContext);
    const { user } = useContext(DevconnectContext);

    if (!likedPosts) return <p className="text-center text-gray-500 mt-5">Loading liked posts...</p>;

    if (likedPosts.length === 0)
        return <p className="text-center text-gray-500 mt-5">You haven't liked any posts yet.</p>;

    return (
        
        <div className="space-y-4">
            <p>Rendering wait</p>
            {likedPosts.map((post) => (
                <PostCard key={post._id} post={post} currentUser={user}/>
            ))}
        </div>
    );
}

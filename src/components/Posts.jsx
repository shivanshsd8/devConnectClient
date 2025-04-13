import { useContext } from "react";
import { DevconnectContext } from "../context/DevconnectContext";
import PostCard from "./PostCard"; 

export default function Posts() {
    const { feed, user } = useContext(DevconnectContext);
    
    if (!user) {
        return <div className="text-center text-gray-500 py-10">Please log in to view posts</div>;
    }
    
    if (!feed) {
        return <div className="text-center text-gray-500 py-10">Loading...</div>;
    }
    
    if (feed.length === 0) {
        return <div className="text-center text-gray-400 py-10">No posts yet. Be the first to share something!</div>;
    } 
    
    return (
        <div className="space-y-6">
            {feed.map((post) => (
                <PostCard key={post._id} post={post} currentUser={user} />
            ))}
        </div>
    );
} 
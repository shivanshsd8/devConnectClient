import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { DevconnectContext } from '../context/DevconnectContext';

export default function PostCard({ post, currentUser }) {
    const { likePostHandler, savePostHandler, savedPosts } = useContext(DevconnectContext);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (post?.likes && currentUser) {
            // More reliable string comparison for IDs
            const isLiked = post.likes.some(like => 
                (like._id || '').toString() === currentUser.id.toString()
            );
            setLiked(isLiked);
            setLikesCount(post.likes.length);
        }
        
        if (savedPosts) {
            const isSaved = savedPosts.some(p => p._id === post._id);
            setSaved(isSaved);
        }
        
        setLoading(false);
    }, [post, post.likes, currentUser, savedPosts]); // Watch the entire post object for changes

    if (!currentUser || loading) return null;
    
    const profileImage = post.author?.profileImage || currentUser.profileImage;
    
    
    const handleLikeClick = async () => {
        const updatedLiked = await likePostHandler(post._id, setLiked);
        if (updatedLiked !== null) {
            setLiked(updatedLiked);
            setLikesCount(prev => updatedLiked ? prev + 1 : prev - 1);
        }
    };
    
    const handleSave = async () => {
        const updated = await savePostHandler(post._id);
        if (updated === true) {
            setSaved(true);
            alert("✅ Post saved successfully!");
        } else if (updated === false) {
            setSaved(false);
            alert("❌ Post removed from bookmarks!");
        } else {
            alert("Failed To Toggle Post Save/Unsave");
        }
    };
    
    function calcTimeDiff(time) {
        if (!time) return 'some time';
        const createdDate = new Date(time);
        const now = new Date();
        const diffInMs = now - createdDate;
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        if (diffInMinutes < 60) return `${diffInMinutes} minutes`;
        return `${Math.floor(diffInMinutes / 60)} hours`;
    }
    
    return (
        <div className="bg-white rounded-2xl shadow-sm p-5 transition hover:shadow-lg">
            <div className="flex items-start gap-4">
                <img
                    src={profileImage}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div className='flex-1'>
                    <div className="flex flex-col">
                        <div className="flex flex-wrap items-center gap-2 ">
                            <p className="font-semibold text-2xl">{post.author?.name}</p>
                            <p className="text-s text-gray-500">@{post.author?.username}</p>
                        </div>
                        <div>
                            <span className="text-sm text-gray-400 ml-auto">
                                .{calcTimeDiff(post.createdAt)} ago
                            </span>
                        </div>
                    </div>
                    <p className="text-gray-700 mt-2 mb-3">{post.content}</p>
                    {post.imageUrl && (
                        <img
                            src={post.imageUrl}
                            alt="Post"
                            className="rounded-xl object-cover w-full max-h-[500px] border transition duration-300 hover:opacity-90"
                        />
                    )}
                </div>
            </div>
            {/* <div className="flex justify-around mt-5 text-gray-600"> */}
            <div className="flex flex-wrap gap-2 justify-around md:justify-between mt-5 text-gray-600">

                <button
                    className={`flex items-center gap-1 md:gap-2 ${liked ? 'text-red-500' : ''} hover:text-red-500 transition cursor-pointer`}
                    onClick={handleLikeClick}
                >
                    <Heart className="w-5 h-5" fill={liked ? 'red' : 'none'} />
                    <span>{likesCount} {likesCount > 1 ? "Likes" : "Like"}</span>
                </button>
                <button className="flex items-center gap-1 md:gap-2 hover:text-blue-500 transition cursor-pointer">
                    <MessageCircle className="w-5 h-5" />
                    <span>Comment</span>
                </button>
                <button className="flex items-center gap-1 md:gap-2 hover:text-green-500 transition cursor-pointer">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                </button>
                <button
                    className={`flex items-center gap-1 md:gap-2 ${saved ? 'text-blue-600' : ''} hover:text-blue-500 transition cursor-pointer`}
                    onClick={handleSave}
                >
                    <Bookmark className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} />
                    <span>{saved ? 'Saved' : 'Save'}</span>
                </button>
            </div>
        </div>
    );
}
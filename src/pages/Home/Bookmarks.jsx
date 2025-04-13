import { useContext, useEffect, useState } from 'react';
import BookmarksIcon from '../../assets/bookmarks.png';
import PostCard from '../../components/PostCard';
import { DevconnectContext } from '../../context/DevconnectContext';

export default function Bookmarks() {
    const [active, setActive] = useState('post');
    const { user, savedPosts, fetchSavedPosts } = useContext(DevconnectContext);
    
    // Ensure saved posts are refreshed when component mounts
    useEffect(() => {
        if (user) {
            fetchSavedPosts();
        }
    }, [user]);
    
    return (
        <div className="w-full flex justify-center bg-gray-50 min-h-screen px-4 py-10">
            <div className="w-full max-w-3xl bg-white rounded-2xl p-6 shadow-md">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <img src={BookmarksIcon} alt="Bookmarks Icon" className="w-10" />
                    <p className="text-3xl md:text-4xl font-bold">Bookmarks</p>
                </div>
                {/* Tabs */}
                <div className="flex gap-4 bg-gray-100 p-2 rounded-lg mb-6">
                    {['post', 'code'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActive(tab)}
                            className={`flex-1 text-center py-2 rounded-lg transition font-medium cursor-pointer  ${active === tab
                                ? 'bg-white text-black shadow font-extrabold'
                                : 'text-gray-600'
                                }`}
                        >
                            {tab === 'post' ? 'Saved Posts' : 'Saved Code Snippets'}
                        </button>
                    ))}
                </div>
                {/* Content */}
                <div>
                    {active === 'post' ? (
                        !savedPosts || savedPosts.length === 0 ? (
                            <div className='bg-gray-100 rounded-lg p-6 text-center'>
                                <p className="text-gray-500">You haven't bookmarked any posts yet. Save posts to see them here!</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {savedPosts.map((post) => (
                                    <PostCard key={post._id} post={post} currentUser={user} />
                                ))}
                            </div>
                        )
                    ) : (
                        <div className='bg-gray-100 rounded-lg p-6 text-center'>
                            <p className="text-gray-500">You haven't bookmarked any code snippets yet. Save code snippets to see them here!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
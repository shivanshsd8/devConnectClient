import { useContext, useEffect } from "react";
import { DevconnectContext } from "../context/DevconnectContext";

export default function OwnPosts() {
    const { ownPosts, fetchOwnPosts, user } = useContext(DevconnectContext);

    useEffect(() => {
        fetchOwnPosts();
    }, [fetchOwnPosts]);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">Your Posts</h1>

                {ownPosts.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">
                        You haven’t posted anything yet!
                    </div>
                ) : (
                    <div className="space-y-6">
                        {ownPosts.map((post) => (
                            <div
                                key={post._id}
                                className="bg-white shadow-sm rounded-xl p-4 border border-gray-100"
                            >
                                <div className="mb-2 text-gray-600 text-sm">
                                    Posted by: {post.author.name || user.name}
                                </div>
                                <p className="text-lg text-gray-800 mb-2">
                                    {post.content}
                                </p>
                                {post.imageUrl && (
                                    <img
                                        src={post.imageUrl}
                                        alt="Post"
                                        className="rounded-md max-h-64 w-full object-cover mt-2"
                                    />
                                )}
                                <div className="mt-2 text-sm text-gray-500">
                                    Likes: {post.likes?.length || 0} · Comments: {post.comments?.length || 0}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

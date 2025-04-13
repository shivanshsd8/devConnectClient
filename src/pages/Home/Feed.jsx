import { useContext, useEffect } from "react";
import searchIcon from '../../assets/searchIcon.png';
import Posts from "../../components/Posts";
import { DevconnectContext } from "../../context/DevconnectContext";

export default function Feed() {
    const { fetchFeed } = useContext(DevconnectContext);
    
    // Ensure feed is refreshed when the component mounts
    useEffect(() => {
        fetchFeed();
    }, []);
    
    return (
        <div className="w-full flex justify-center px-4 py-8">
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="mb-6">
                    <p className="text-4xl font-bold">Explore</p>
                </div>

                {/* Search */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 w-full">
                    <div className="relative w-full">
                        <img src={searchIcon} alt="Search" className="w-5 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search post, code snippets or developers"
                            className="w-full pl-10 pr-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#3949ab]"
                        />
                    </div>
                    <button className="px-4 py-2 text-lg bg-[#3949ab] text-white rounded-lg hover:bg-[#303f9f] transition cursor-pointer">
                        Search
                    </button>
                </div>

                {/* Discover Section */}
                <div className="w-full space-y-6">
                    <p className="text-lg font-semibold mb-2">Discover</p>
                    <Posts />
                </div>
            </div>
        </div>
    );
}
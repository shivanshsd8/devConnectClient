import { useContext, useEffect, useState } from "react"
import { DevconnectContext } from "../context/DevconnectContext";
import { useNavigate } from "react-router-dom";


export default function ProfileCard() {
  const navigate = useNavigate();
  const {user} = useContext(DevconnectContext)
  if (!user) {
    return (
      <div className="flex flex-col justify-around rounded-lg bg-white w-full max-w-md mx-auto p-6 sm:p-8 shadow-md animate-pulse space-y-6">

        {/* Profile section */}
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-300 rounded-full" />
          <div className="flex flex-col space-y-2">
            <div className="w-32 h-4 bg-gray-300 rounded" />
            <div className="w-24 h-3 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Bio section */}
        <div className="w-full h-4 bg-gray-200 rounded" />
        <div className="w-3/4 h-4 bg-gray-200 rounded" />

        {/* Posts/Followers/Following */}
        <div className="flex flex-wrap justify-between sm:justify-around gap-4 pt-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-2 w-[30%] sm:w-auto">
              <div className="w-10 h-6 bg-gray-300 rounded" />
              <div className="w-16 h-3 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="w-full h-12 bg-gray-300 rounded-lg mt-4" />
      </div>
    );
  }
  const profileImage = user.profileImage;
  return (
    <>
      <div className="mb-5 flex flex-col justify-around rounded-lg bg-white w-full max-w-xl mx-auto p-6 sm:p-8 sm:mb-4 md:mb-5 md:w-70 lg:w-full">
        {/* Profile info */}
        <div className="flex flex-col items-center mb-4 sm:flex-row sm:items-center sm:mb-6">
          <div>
            <img src={profileImage} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
          </div>
          <div className="sm:ml-4 text-center sm:text-left">
            <p className="text-2xl font-bold">{user.name}</p>
            <p className="text-sm text-gray-500">@{user?.username.toLowerCase()}</p>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-4 text-center sm:text-left">
          <p className="text-gray-600 font-medium">{user.bio}</p>
        </div>

        <hr className="mb-4" />

        {/* Stats */}
        <div className="flex justify-around sm:items-center space-y-3 sm:flex-row sm:space-y-0 mb-4">
          <p className="text-lg text-gray-500"><span className="font-bold text-2xl text-black">{user.postCount}</span> Posts</p>
          <p className="text-lg text-gray-500"><span className="font-bold text-2xl text-black">{user.followersCount}</span> Followers</p>
          <p className="text-lg text-gray-500"><span className="font-bold text-2xl text-black">{user.followingCount}</span> Following</p>
        </div>

        <hr className="mb-4" />

        {/* Button */}
        <div>
          <button className="w-full h-11 rounded-lg font-bold text-md bg-[#3949ab] text-white hover:bg-[#303f9f] transition-colors duration-200 cursor-pointer" onClick={()=>navigate('/editProfile')}>
            Edit Profile
          </button>
        </div>
      </div>


    </>
  )
}
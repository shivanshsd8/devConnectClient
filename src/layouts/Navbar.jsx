import { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import notificationIcon from '../assets/notificationIcon.png'
import searchIcon from '../assets/searchIcon.png'
import profileIcon from '../assets/user.png'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import ProfileDropdown from '../components/ProfileDropdown'


// Importing Hamburger icons
import { Menu, X } from 'lucide-react';
import { DevconnectContext } from '../context/DevconnectContext'


export default function Navbar() {
    const { logoutHandler } = useContext(DevconnectContext)
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const closeMenu = () => setIsOpen(false);
    const location = useLocation();
    return (
        <>
            {/* Top div navbar */}
            <div className='relative'>
                <div className="flex justify-around items-center sm:px-10 py-5 border-b-2 border-gray-200 shadow-xs">
                    {/* Left div */}
                    <div className="flex items-center w-2/3 ">
                        <img src={logo} alt="Logo" className="h-10" />
                        <span className="text-2xl font-bold mr-10 cursor-pointer text-[#3949ab]" onClick={()=>navigate('/home')}>&lt;DevConnect/&gt;</span>
                        <div className="hidden lg:flex gap-10 text-s">
                            <Link to={'/home'} className={`cursor-pointer px-5 py-2 border-b-2 border-gray-300 rounded-md  ${location.pathname === '/home' ? ' bg-[#3949ab] text-white  rounded-lg' : 'hover:border-[#3949ab] transition duration-300 ease-in-out text-gray-700'}`}>Home</Link>
                            <Link to={'/explore'} className={`cursor-pointer px-5 py-2 border-b-2 border-gray-300 rounded-md  ${location.pathname === '/explore' ? ' bg-[#3949ab] text-white rounded-lg' : 'hover:border-[#3949ab] transition duration-300 ease-in-out text-gray-700'}`}>Explore</Link>
                            <Link to={'/bookmarks'} className={`cursor-pointer px-5 py-2 border-b-2 border-gray-300 rounded-md  ${location.pathname === '/bookmarks' ? ' bg-[#3949ab] text-white rounded-lg' : 'hover:border-[#3949ab] transition duration-300 ease-in-out text-gray-700'}`}>Bookmarks</Link>
                        </div>
                    </div>
                    {/* Right div */}
                    <div className="hidden lg:flex justify-end  items-center w-1/3 ">
                        <div className=''>
                            <input type="text" className='lg:w-65 border-2 border-gray-300 rounded-lg px-3 py-2 mr-5 outline-none' placeholder='Search...' />
                            <span> <img src={searchIcon} alt="" className='w-6 absolute top-8 right-34' /></span>
                        </div>
                        <img src={notificationIcon} alt="" className='w-7 mr-5' />
                        <ProfileDropdown />
                    </div>


                    {/* Hamburger Logic */}
                    <div className='lg:hidden'>
                        {isOpen ? (
                            <X onClick={() => setIsOpen(false)} className="w-6 h-6 cursor-pointer" />
                        ) :
                            (
                                <Menu onClick={() => setIsOpen(true)} className="w-6 h-6 cursor-pointer" />
                            )}
                    </div>
                    {/* Mobile DropDown :- */}
                    {isOpen && (
                        <div className="lg:hidden px-6 pb-4 flex flex-col gap-4 bg-white border-t shadow-md absolute top-full left-0 w-full z-40 pt-5">
                            <Link to="/home" onClick={closeMenu} className={`py-2 px-4 rounded-md ${location.pathname === '/home' ? 'bg-[#3949ab] text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                                Home
                            </Link>
                            <Link to="/explore" onClick={closeMenu} className={`py-2 px-4 rounded-md  ${location.pathname === '/explore' ? 'bg-[#3949ab] text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                                Explore
                            </Link>
                            <Link to="/bookmarks" onClick={closeMenu} className={`py-2 px-4 rounded-md ${location.pathname === '/bookmarks' ? 'bg-[#3949ab] text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                                Bookmarks
                            </Link>

                            {/* Mobile Search */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 outline-none"
                                />
                                <img
                                    src={searchIcon}
                                    alt="search"
                                    className="w-5 absolute top-1/2 right-3 transform -translate-y-1/2"
                                />
                            </div>

                            {/* Icons */}
                            <div className="flex gap-4 items-center justify-around">

                                <img src={notificationIcon} alt="notifications" className="w-6" />
                                {/* <img src={profileIcon} alt="profile" className="w-6" /> */}
                                <ProfileDropdown closeMobileMenu = {closeMenu}/>
                                {/* <button onClick={() => logoutHandler()} className='cursor-pointer bg-gray-500 text-white h-10 w-25 rounded-lg'>Logout</button> */}

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}


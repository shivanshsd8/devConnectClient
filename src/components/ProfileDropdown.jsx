import { useContext, useEffect, useRef, useState } from 'react'
import profileIcon from '../assets/user.png'
import { DevconnectContext } from '../context/DevconnectContext'
import { Link, useNavigate } from 'react-router-dom'

export default function ProfileDropdown({closeMobileMenu}) {
    const {logoutHandler} = useContext(DevconnectContext)
    const navigate = useNavigate();
    
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);
    const handleOptionClick = (path) => {
        navigate(path);
        setIsOpen(false);               // closes dropdown
        if (closeMobileMenu) closeMobileMenu();  // closes hamburger menu
    }


    return (
        <>
            <div className='relative inline-block text-left' ref={dropdownRef}>
                <button onClick={() => setIsOpen(!isOpen)} className='text-black  rounded-full cursor-pointer'>
                    <img src={profileIcon} alt="profile" className="w-5 mt-1.5" />
                </button>

                {isOpen && (
                    <div>
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 transition ease-out duration-100">
                            <ul className="py-1">
                                <Link to={'/profile'}><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-300" onClick={()=>handleOptionClick('/profile')}>My Profile</li></Link>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => logoutHandler()}>Logout</li>
                            </ul>
                        </div>
                    </div>
                )
                }
            </div>
        </>
    )
}
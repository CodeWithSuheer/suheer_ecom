import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserAsync, reset } from '../../features/authSlice';
import './Header.css'

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // GETTING USER DETAIL
    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);

    // GETTING USER DETAIL
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    // HANDLE LOGOUT
    const handleLogout = async () => {
        if (user && user.token) {
            dispatch(logoutUserAsync())
            dispatch(reset())
            navigate('/login')
        } else {
            navigate('/login')
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {user?.role !== 'admin' ? (
                <nav className={`bg-white py-4  shadow-lg transition-all fixed top-0 left-0 right-0 z-60`}>
                    <div className="container px-6 mx-auto">
                        <div className="lg:flex lg:items-center lg:justify-between">
                            <div className="flex items-center justify-between">
                                {/* -------------- BRAND LOGO -------------- */}
                                <Link to="/">
                                    {/* <img className="w-auto h-6 sm:h-7" src="https://merakiui.com/images/full-logo.svg" alt="" /> */}
                                    <h2 className='text-2xl font-semibold tracking-wide'>SUHEER</h2>
                                </Link>

                                {/* -------------- HAMBURGER BUTTON FOR MOBILE VIEW -------------- */}
                                <div className="flex lg:hidden">
                                    <button onClick={toggleMenu} type="button" className="text-gray-500  hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="toggle menu">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* -------------- MENU FOR LARGE VIEW -------------- */}
                            <div className="hidden lg:flex lg:items-center">
                                <Link to="/" className="px-3 py-2 mx-3 text-gray-700 hover:bg-gray-100 rounded-xl">Products</Link>
                                <Link to="/" className="px-3 py-2 mx-3 text-gray-700 hover:bg-gray-100 rounded-xl">Trending</Link>
                                <Link to="/" className="px-3 py-2 mx-3 text-gray-700 hover:bg-gray-100 rounded-xl">About</Link>
                                <Link to="/contact" className="px-3 py-2 mx-3 text-gray-700 hover:bg-gray-100 rounded-xl">Contact</Link>

                                <span className='hidden w-px h-6 bg-gray-300 md:block'></span>

                                <div className="flex items-center mt-4 lg:mt-0">
                                    <Link to="/cart" className="relative mx-5 text-gray-700 transition-colors duration-300 transform hover:text-gray-600">
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                        <span className="absolute top-0 left-0 p-1 text-xs text-white bg-blue-500 rounded-full"></span>
                                    </Link>


                                    {user ? (
                                        <>
                                            <div className="relative inline-block" ref={dropdownRef}>
                                                <button
                                                    onClick={toggleDropdown}
                                                    className="relative z-10 flex items-center p-2 text-md text-gray-600 bg-white border border-transparent rounded-md focus:outline-none"
                                                >
                                                    <span className="mx-1">{user?.name}</span>
                                                    <svg className="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z" fill="currentColor"></path>
                                                    </svg>
                                                </button>

                                                {/* Dropdown menu */}
                                                {isOpen && (
                                                    <div className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl">
                                                        {/* Dropdown items */}
                                                        <Link to="/" className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform hover:bg-gray-100">
                                                            <img className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9" src="https://cdn.shopify.com/s/files/1/0704/6378/2946/files/profile-pic_6.png?v=1710185888" alt="jane avatar" />
                                                            <div className="mx-1">
                                                                <h1 className="text-sm font-semibold text-gray-700">{user?.name}</h1>
                                                                <p className="text-sm text-gray-500">{user?.email}</p>
                                                            </div>
                                                        </Link>

                                                        <hr className="border-gray-200" />

                                                        <Link className="block px-4 py-3  w-full text-left text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100 ">
                                                            View Profile
                                                        </Link>

                                                        <Link to="/" className="block px-4 py-3 w-full text-left text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100 ">
                                                            Settings
                                                        </Link>

                                                        <hr className="border-gray-200" />

                                                        <Link to="/" className="block px-4 py-3 w-full text-left text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100 ">
                                                            Help
                                                        </Link>
                                                        <button onClick={handleLogout} className="block px-4 py-3 w-full text-left text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100 hover:text-red-600">
                                                            Sign Out
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                        </>


                                    ) : (
                                        <Link to="/login" type="button" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-xl">
                                            Login
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* -------------- MENU FOR MOBILE VIEW -------------- */}
                        <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white  lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}>
                            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                                <Link to="/" className="px-3 py-2 mx-3 text-gray-700 hover:bg-gray-100 rounded-xl">Products</Link>
                                <Link to="/" className="px-3 py-2 mx-3 text-gray-700 hover:bg-gray-100 rounded-xl">Trending</Link>
                                <Link to="/" className="px-3 py-2 mx-3 text-gray-700 hover:bg-gray-100 rounded-xl">About</Link>
                                <Link to="/contact" className="px-3 py-2 mx-3 text-gray-700 hover:bg-gray-100 rounded-xl">Contact</Link>
                            </div>

                            <div className="flex items-center mt-4 lg:mt-0">
                                {user ? (
                                    <>
                                        <button type="button" className="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                                            <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                                                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" className="object-cover w-full h-full" alt="avatar" />
                                            </div>

                                            <h3 className="mx-2 text-gray-700 lg:hidden">{user?.name}</h3>
                                        </button>
                                    </>
                                ) : (
                                    <Link to="/login" type="button" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-xl">
                                        Login
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </nav >
            ) : null}
        </>
    )
}

export default Navbar

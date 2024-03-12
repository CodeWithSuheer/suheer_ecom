import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaOpencart } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserAsync, reset } from '../../features/authSlice';
import { HashLink } from 'react-router-hash-link';
import './Header.css'

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);


    const handleLogout = async () => {
        if (user && user.token) {
            dispatch(logoutUserAsync())
            dispatch(reset())
            navigate('/login')
        } else {
            navigate('/login')
        }
    }

    return (
        <>
            {user?.role !== 'admin' ? (
                <section>
                    {/* ----------- TOP NAV ----------- */}
                    <div className="top_nav flex justify-center items-center h-10">
                        <p className='text-gray-100 text-xs sm:text-sm text-center font-medium'>Free Delivery All Over Pakistan, Easy Cash On Delivery</p>
                    </div>

                    {/* ----------- CATEGORIES ----------- */}
                    <div className="nav_func bg-black text-white">
                        <div className="flex items-center flex-col sm:flex-row py-4 ">
                            {/* NAV-LEFT */}
                            <div className="nav_logo_search flex items-center px-10" style={{ minWidth: '60%' }}>
                                <Link to="/" className="nav_logo text-orange-500 ml-0 sm:ml-16 text-2xl sm:text-3xl font-medium flex items-center"><FaOpencart className='mr-2' />Easy<span className='text-white'>Cart</span></Link>
                                {/* SEARCH */}
                                <div className="nav_search w-full hidden sm:block ">
                                    <form
                                        onSubmit={(e) => e.preventDefault()}
                                        className="max-w-md px-4 mx-auto">
                                        <div className="relative">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-orange-500 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            <input
                                                type="text"
                                                placeholder="Search"
                                                className="bg-white text-black p-2 rounded-3xl pl-11 w-full focus:outline-none"
                                            />
                                        </div>
                                    </form>
                                    {/* <input type="search" name="" id="" placeholder='Search' className='bg-white p-2 rounded-2xl px-2 w-full' /> */}
                                </div>
                            </div>
                            {/* NAV-RIGHT */}
                            <div className="nav_user_order_cart text-xs sm:text-sm md:text-md flex justify-end items-center pt-3 sm:pt-0 px-0 sm:pr-16" style={{ minWidth: '40%' }}>
                                <div className="flex items-center mx-5 capitalize underline underline-offset-4"><p>{user?.name}</p></div>
                                <Link to="/cart" className="flex items-center mx-5 "><FaTruckFast className='text-xl mr-2 hidden sm:flex' /><p>Track Order</p></Link>
                                <Link to="/cart" className="flex items-center mx-5 "><MdShoppingCart className='text-xl mr-2 hidden sm:flex' /><p>Cart</p></Link>
                                {user ? (
                                    <button onClick={handleLogout} className="login_div mx-5"><p>Logout</p></button>
                                ) : (
                                    <>
                                        <HashLink to="/login#login" className="login_div hover:underline hover:underline-offset-4">
                                            Login
                                        </HashLink>
                                        <p>/</p>
                                        <HashLink to="/signup#signup" className="login_div hover:underline hover:underline-offset-4">
                                            Signup
                                        </HashLink>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ----------- CATEGORIES ----------- */}
                    <div className='categories_nav bg-black hidden sm:block'>
                        <ul className='h-12 flex justify-center items-center gap-10 text-sm sm:text-md lg:text-md text-gray-100 overflow-x-auto'>
                            <li className='cursor-pointer hover:underline underline-offset-4'>Fitness</li>
                            <li className='cursor-pointer hover:underline underline-offset-4'>Kids</li>
                            <li className='cursor-pointer hover:underline underline-offset-4'>Pets</li>
                            <li className='cursor-pointer hover:underline underline-offset-4'>Health & Beauty</li>
                            <li className='cursor-pointer hover:underline underline-offset-4'>Home</li>
                            <li className='cursor-pointer hover:underline underline-offset-4'>Electronics</li>
                            <li className='cursor-pointer hover:underline underline-offset-4'>Contact</li>
                        </ul>
                    </div>
                </section>
            ) : ('')}
        </>
    )
}

export default Header

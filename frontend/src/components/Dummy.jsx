import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync, reset } from '../features/authSlice';
import toast from 'react-hot-toast';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (user && user.role === 'admin') {
            navigate('/admin')
            window.scroll(0, 0)
        }
        else if (user && user.role === 'user') {
            navigate('/')
            window.scroll(0, 0)
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, dispatch, navigate])


    // HANDLE SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUserAsync(formData))
    }
    return (
        <>
            <section id='login' className='signup_section h-screen flex justify-center items-center'>
                <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
                    <div className="px-6 py-4">
                        <div className="flex justify-center mx-auto">
                            <img
                                alt=""
                                className="w-auto h-7 sm:h-8"
                                src="https://merakiui.com/images/logo.svg"
                            />
                        </div>
                        <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
                            Welcome Back
                        </h3>
                        <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
                            Login or create account
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="w-full mt-4">
                                <input
                                    aria-label="Email Address"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Email Address"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="w-full mt-4">
                                <input
                                    aria-label="Password"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Password"
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-center mt-4">
                                <button type='submit' className="flex justify-center items-center px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                    {isLoading && <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                                        </path>
                                    </svg>
                                    }
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                        <span className="text-sm text-gray-600 dark:text-gray-200">
                            Don't have an account?{' '}
                        </span>
                        <Link to="/signup"
                            className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login

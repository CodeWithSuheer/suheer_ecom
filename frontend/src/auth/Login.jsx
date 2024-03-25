import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync, reset } from '../features/authSlice';
import toast from 'react-hot-toast';
import './Auth.css'

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
            <section id='login' className="bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee]">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-[100vh] lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Sign in to your account
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <div>
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                        htmlFor="email"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        id="email"
                                        type="email"
                                        placeholder="name@company.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                        htmlFor="password"
                                    >
                                        Password
                                    </label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        id="password"
                                        placeholder="••••••••"
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                </div>


                                {/* <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                aria-describedby="remember"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                id="remember"
                                                required
                                                type="checkbox"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label
                                                className="text-gray-500 dark:text-gray-300"
                                                htmlFor="remember"
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <a
                                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                        href="#"
                                    >
                                        Forgot password?
                                    </a>
                                </div> */}

                                <button type="submit" disabled={isLoading} className={`flex justify-center items-center w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>
                                    {isLoading && <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                                        </path>
                                    </svg>
                                    }
                                    Sign in
                                </button>
                                <p className="text-sm font-light text-gray-500">
                                    Don’t have an account yet?{' '}
                                    <Link to="/signup" className="font-medium text-primary-600 hover:underline">
                                        Sign up
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login

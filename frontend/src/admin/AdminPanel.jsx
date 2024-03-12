import React, { useEffect, useRef, useState } from "react";
import { Moon, Sun, Settings } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAsync, reset } from "../features/authSlice";
import { FaStore } from "react-icons/fa";
import { MdAddBusiness } from "react-icons/md";
import { FaOpencart } from "react-icons/fa6";
import { getProductAsync } from "../features/productSlice";


const AdminBody = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [isMenuOpen, setMenuOpen] = useState(false);
    const menuButtonRef = useRef(null);
    const menuRef = useRef(null);


    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);


    useEffect(() => {
        if (!user) {
            navigate('/login')
        }

        dispatch(getProductAsync());
    }, [user, dispatch, navigate])


    const handleLogout = async () => {
        if (user && user.token) {
            dispatch(logoutUserAsync())
            dispatch(reset())
            navigate('/login')
        } else {
            navigate('/login')
        }
    }

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const closeMenu = (event) => {
        if (
            !menuRef.current.contains(event.target) &&
            event.target !== menuButtonRef.current
        ) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", closeMenu);

        return () => {
            document.removeEventListener("click", closeMenu);
        };
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleThemeChange = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <>
            <div className="antialiased bg-gray-50 dark:bg-gray-900">
                {/* ---------------- NAVBAR ---------------- */}
                <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
                    <div className="flex flex-wrap justify-between items-center">
                        {/* ---------------- NAVBAR - LEFT ---------------- */}
                        <div className="flex justify-start items-center">
                            <button
                                aria-controls="drawer-navigation"
                                className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                onClick={toggleSidebar}
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        fillRule="evenodd"
                                    />
                                </svg>
                                <svg
                                    aria-hidden="true"
                                    className="hidden w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        fillRule="evenodd"
                                    />
                                </svg>
                                <span className="sr-only">Toggle sidebar</span>
                            </button>

                            <Link to="/admin" className="flex items-center justify-between mr-4">
                                <FaOpencart size={30} className="mr-2.5 text-gray-800 dark:text-gray-200" />
                                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                    Dashboard
                                </span>
                            </Link>
                        </div>

                        {/* ---------------- NAVBAR - RIGHT ---------------- */}
                        <div className="flex items-center lg:order-2">
                            <button
                                onClick={handleThemeChange}
                                className=" text-gray-800 dark:text-white px-3 py-2.5 rounded-lg"
                            >
                                {theme === "light" ? <Moon /> : <Sun />}
                            </button>

                            <div className="relative inline-block text-left">
                                <div>
                                    <button
                                        aria-expanded={isMenuOpen}
                                        aria-haspopup="true"
                                        className="inline-flex justify-center items-center gap-x-1.5 rounded-full bg-gray-100 h-9 w-9 text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 capitalize"
                                        id="menu-button"
                                        type="button"
                                        onClick={toggleMenu}
                                        ref={menuButtonRef}
                                    >
                                        {user?.name[0]}
                                    </button>
                                </div>
                                <div
                                    aria-labelledby="menu-button"
                                    aria-orientation="vertical"
                                    className={`${isMenuOpen ? "" : "hidden"
                                        } absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                                    role="menu"
                                    tabIndex="-1"
                                    ref={menuRef}
                                >
                                    <div className="py-1" role="none">
                                        <a
                                            className="text-gray-700 block px-4 py-2 text-sm"
                                            href="#"
                                            id="menu-item-0"
                                            role="menuitem"
                                            tabIndex="-1"
                                        >
                                            Account settings
                                        </a>
                                        <a
                                            className="text-gray-700 block px-4 py-2 text-sm"
                                            href="#"
                                            id="menu-item-1"
                                            role="menuitem"
                                            tabIndex="-1"
                                        >
                                            Support
                                        </a>
                                        <a
                                            className="text-gray-700 block px-4 py-2 text-sm"
                                            href="#"
                                            id="menu-item-2"
                                            role="menuitem"
                                            tabIndex="-1"
                                        >
                                            License
                                        </a>
                                        <form action="#" method="POST" role="none">
                                            <button
                                                onClick={handleLogout}
                                                to="/"
                                                className="text-red-700 block w-full px-4 py-2 text-left text-sm"
                                                id="menu-item-3"
                                                role="menuitem"
                                                tabIndex="-1"
                                                type="submit"
                                            >
                                                Sign out
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                {/* ---------------- SIDEBAR ---------------- */}
                <aside
                    aria-label="Sidenav"
                    className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                        } bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
                >
                    <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
                        <form action="#" className="md:hidden mb-2" method="GET">
                            <label className="sr-only" htmlFor="sidebar-search">
                                Search
                            </label>
                            <div className="relative">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            clipRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            fillRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    id="sidebar-search"
                                    name="search"
                                    placeholder="Search"
                                    type="text"
                                />
                            </div>
                        </form>

                        <ul className="space-y-2">
                            <li>
                                <Link to="/admin" className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <FaStore size={22} className="text-gray-500 dark:text-gray-400" />
                                    <span className="ml-3">Products</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/create_product" className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <MdAddBusiness size={22} className="text-gray-500 dark:text-gray-400" />
                                    <span className="ml-3">Add Product</span>
                                </Link>
                            </li>
                        </ul>

                        <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
                            <li>
                                <a
                                    className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                                    href="#"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                        <path
                                            clipRule="evenodd"
                                            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                            fillRule="evenodd"
                                        />
                                    </svg>
                                    <span className="ml-3">Category</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20">
                        <a
                            className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                            href="#"
                        >
                            <svg
                                aria-hidden="true"
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                            </svg>
                        </a>
                    </div>
                </aside>
                {/* ---------------- DASHBOARD ---------------- */}
                <main className="md:ml-64 h-auto pt-20 bg-gray-200 dark:bg-gray-900">
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default AdminBody;

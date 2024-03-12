import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteGoalsAsync, updateProductAsync } from '../features/productSlice';
import { FaImage } from "react-icons/fa";

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const { products, isLoading, updateLoading, deleteLoading } = useSelector((state) => state.product);
    const selectedProduct = products.find((product) => product._id === id);

    const categories = [
        'Fitness',
        'Kids',
        'Pets',
        'Health & Beauty',
        'Home',
        'Electronics'];


    const categoriesObjects = categories.map((category, index) => ({
        id: index + 1,
        name: category
    }));

    // Formdata
    const [formdata, setFormdata] = useState({
        name: '',
        item_code: '',
        price: '',
        category: '',
        quantity: '',
        description: '',
        image: null,
        topSales: false,
    })


    useEffect(() => {
        if (id && selectedProduct) {
            setFormdata((prevData) => ({
                ...prevData,
                name: selectedProduct.name || '',
                item_code: selectedProduct.item_code || '',
                price: selectedProduct.price || '',
                category: selectedProduct.category || '',
                quantity: selectedProduct.quantity || '',
                description: selectedProduct.description || '',
                image: selectedProduct.image || '',
                topSales: selectedProduct.topSales || false,
            }));
        }
    }, []);

    // HANDLE IMAGE CHANGE
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFileToBase(file);
    };

    const resetImage = () => {
        setFormdata({ ...formdata, image: '' });
        fileInputRef.current.value = '';
    };

    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFormdata({ ...formdata, image: reader.result });
        };
    };

    // HANDLE CHECK CHANGE
    const handleCheckChange = (event) => {
        const { name, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : event.target.value;

        setFormdata({
            ...formdata,
            [name]: newValue,
        });
    };

    // HANDLE SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedFormdata = {
            ...formdata,
            id: id,
        };

        dispatch(updateProductAsync(updatedFormdata))
            .then(() => {
                navigate('/admin');
                window.scroll(0, 0)
            })
    }

    // HADNLE DELETE
    const handleDelete = (id) => {
        dispatch(deleteGoalsAsync(id))
            .then(() => {
                navigate('/admin');
                window.scroll(0, 0)
            })
    }




    return (
        <>
            <section className="bg-gray-200 dark:bg-gray-900">
                <div className="py-8 px-18 sm:px-20 md:px-16 lg:px-44 mx-auto max-w-full lg:py-10">
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                        Update product
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="name"
                                >
                                    Product Name
                                </label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    id="name"
                                    name="name"
                                    placeholder="Type product name"
                                    type="text"
                                    value={formdata.name}
                                    onChange={(e) => setFormdata({ ...formdata, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="w-full">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="item_code"
                                >
                                    Item Code
                                </label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    id="item_code"
                                    name="item_code"
                                    placeholder="Item Code"
                                    type="text"
                                    value={formdata.item_code}
                                    onChange={(e) => setFormdata({ ...formdata, item_code: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="w-full">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="price"
                                >
                                    Price
                                </label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    id="price"
                                    name="price"
                                    placeholder="Price"
                                    type="number"
                                    value={formdata.price}
                                    onChange={(e) => setFormdata({ ...formdata, price: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="category"
                                >
                                    Category
                                </label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    id="category"
                                    value={formdata.category}
                                    onChange={(e) => setFormdata({ ...formdata, category: e.target.value })}
                                >
                                    {categoriesObjects.map((cat) => (
                                        <option key={cat.id} value={cat.name}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="quantity"
                                >
                                    Quantity
                                </label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    id="quantity"
                                    name="quantity"
                                    placeholder="Available quantity"
                                    type="number"
                                    value={formdata.quantity}
                                    onChange={(e) => setFormdata({ ...formdata, quantity: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="description"
                                >
                                    Description
                                </label>
                                <textarea
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    id="description"
                                    placeholder="Your description here"
                                    rows="3"
                                    value={formdata.description}
                                    onChange={(e) => setFormdata({ ...formdata, description: e.target.value })}
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    defaultValue=""
                                    id="default-checkbox"
                                    type="checkbox"
                                    name='topSales'
                                    checked={formdata.topSales}
                                    onChange={handleCheckChange}

                                />
                                <label
                                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    htmlFor="default-checkbox"
                                >
                                    Top Sales
                                </label>
                            </div>

                            {/* IMAGE */}
                            {formdata?.image ? (
                                <div className="sm:col-span-2 relative">
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600"
                                            htmlFor="dropzone-file"
                                        >
                                            <img
                                                src={formdata?.image?.secure_url}
                                                alt="Selected"
                                                className='h-full'
                                            />
                                        </label>
                                    </div>
                                    <div className="reset_button absolute top-3 right-3 bottom-0">
                                        <button type='button' onClick={resetImage} className='reset_image'><FaImage size={22} className='text-gray-700 dark:text-white' /></button>
                                    </div>
                                </div>
                            ) : (
                                <div className="sm:col-span-2">
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                            htmlFor="dropzone-file"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                    fill="none"
                                                    viewBox="0 0 20 16"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                    />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">
                                                        Click to upload
                                                    </span>
                                                    {' '}or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                                                </p>
                                            </div>
                                            <input
                                                className="hidden"
                                                id="dropzone-file"
                                                type="file"
                                                // id="file"
                                                onChange={handleImageChange}
                                                accept="image/*"
                                                ref={fileInputRef}
                                            />
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>


                        <div className="buttons_bar flex justify-between items-center">
                            {updateLoading ? (
                                <button type='button' className="w-40 flex justify-center items-center px-5 py-2.5 mt-2 sm:mt-5 text-sm font-medium text-center text-white rounded-lg bg-primary-800">
                                    <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                                        </path>
                                    </svg>
                                </button>
                            ) : (
                                <button type='submit' className="w-40 flex justify-center items-center px-5 py-2.5 mt-2 sm:mt-5 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800">
                                    Update product
                                </button>
                            )}

                            {deleteLoading ? (
                                <button type='button' className="w-40 flex justify-center items-center px-5 py-2.5 mt-2 sm:mt-5 text-sm font-medium text-center text-white rounded-lg bg-red-800">
                                    <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                                        </path>
                                    </svg>
                                </button>
                            ) : (
                                <button type='button' onClick={() => handleDelete(id)} className="w-40 flex justify-center items-center px-5 py-2.5 mt-2 sm:mt-5 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800">
                                    Delete product
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default UpdateProduct
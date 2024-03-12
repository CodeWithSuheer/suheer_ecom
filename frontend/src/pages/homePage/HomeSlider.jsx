import React, { useEffect, useRef, useState } from "react";
import { ShoppingBag } from 'lucide-react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import product from './ProductData';
import { IoArrowBackSharp } from "react-icons/io5";
import { IoArrowForward } from "react-icons/io5";

const HomeSlider = () => {
    const [slidesToShow, setSlidesToShow] = useState(4);
    const sliderRef = useRef(null);

    const next = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    const previous = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    const settings = {
        // dots: true,
        infinite: true,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        pauseOnHover: true,
    };

    // Update the number of slides based on screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1200) {
                setSlidesToShow(4); // Full Desktop view
            } else if (window.innerWidth >= 1024) {
                setSlidesToShow(3); // Desktop view
            } else if (window.innerWidth >= 768) {
                setSlidesToShow(1); // Tablet view
            } else {
                setSlidesToShow(1); // Mobile view
            }
        };

        // Initial update
        handleResize();

        window.addEventListener("resize", handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <section className='py-10'>
                <div className="container mx-auto px-3 sm:px-0">

                    <div className=" flex justify-end items-center gap-4">
                        <button onClick={previous} className="inline-block rounded-full border border-gray-800 hover:border-[#FFC522] p-3 text-gray-800 hover:bg-[#FFC522] hover:text-white focus:outline-none">
                            <IoArrowBackSharp size={22} />
                        </button>

                        <button onClick={next} className="inline-block rounded-full border border-gray-800 hover:border-[#FFC522] p-3 text-gray-800 hover:bg-[#FFC522] hover:text-white focus:outline-none">
                            <IoArrowForward size={22} />
                        </button>
                    </div>


                    <div className="mx-auto">
                        <Slider ref={sliderRef} {...settings}>
                            {product.map((item, index) => (
                                <div className="my-5 mx-3 sm:mx-2 max-w-[17rem] sm:max-w-[18.8rem] text-gray-900 hover:text-yellow-300 cursor-pointer overflow-hidden rounded-lg shadow-lg transition hover:shadow-xl focus:outline-none">
                                    <img
                                        alt=""
                                        src={item.img}
                                        className="h-56 w-full object-cover"
                                    />

                                    <div className="bg-white p-4 sm:p-4">
                                        <h3 className="mt-0.5 text-lg font-semibold text-gray-900">{item.name}</h3>
                                        <p className="mt-0.5 text-md text-gray-900">#{item.category}</p>

                                        <div class="flex items-center mt-0.5">
                                            <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                            <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                            <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                            <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                            <svg class="w-4 h-4 mr-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                        </div>

                                        <div class="flex justify-between items-center">
                                            <p className="mt-2 text-black">Rs. {item.price}</p>
                                            <button className='px-4'><ShoppingBag className='text-gray-700 hover:text-yellow-300' /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeSlider

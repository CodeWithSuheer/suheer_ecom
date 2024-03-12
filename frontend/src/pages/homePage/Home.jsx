import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import UpperShowCase from './UpperShowCase';
import CtaHome from './CtaHome';
import HomeSlider from './HomeSlider';
import Testimonial from './Testimonial';
import { TbTruckDelivery } from "react-icons/tb";
const Home = () => {
    const navigate = useNavigate();

    const handleSingleProduct = () => {
        navigate('/singleproduct/8237928');
    }


    return (
        <>
            {/* ----------- HOME BANNER -----------*/}
            <section className='home_banner'>
                <div className="home_banner_img px-0 sm:px-7 py-0 sm:py-7">
                    <img className='rounded-none sm:rounded-2xl h-full w-full' src="https://cdn.shopify.com/s/files/1/0704/6378/2946/files/5594188_fe61cba3-360c-4941-a27b-bbd27f2a5552.jpg?v=1709730312" alt="" />
                </div>
            </section>

            {/* ----------- CATEGORY DISPLAY -----------*/}
            <section className='container mx-auto py-10 px-2.5 sm:px-0'>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    <div className="h-60 shadow-lg flex justify-start items-center rounded-lg bg-[#FFC522]">
                        <div className="data px-10">
                            <img className='h-20' src="https://cdn.shopify.com/s/files/1/0704/6378/2946/files/fast-delivery.png?v=1710254221" alt="" />
                            <h2 className='mt-3 text-2xl font-semibold'>Free Shipping</h2>
                            <p className='text-md mt-1'>Free shipping on all orders</p>
                        </div>
                    </div>
                    <div className="h-60 shadow-lg flex justify-start items-center rounded-lg bg-gray-200">
                        <div className="data px-10">
                            <img className='h-20' src="https://cdn.shopify.com/s/files/1/0704/6378/2946/files/24-hours.png?v=1710254433" alt="" />
                            <h2 className='mt-3 text-2xl font-semibold'>24/7 Support</h2>
                            <p className='text-md mt-1'>Contact us any time for your problem</p>
                        </div>
                    </div>
                    <div className="h-60 shadow-lg flex justify-start items-center rounded-lg bg-[#FFC522]">
                        <div className="data px-10">
                            <img className='h-20' src="https://cdn.shopify.com/s/files/1/0704/6378/2946/files/credit-card.png?v=1710254433" alt="" />
                            <h2 className='mt-3 text-2xl font-semibold'>Secure Payment</h2>
                            <p className='text-md mt-1'>Hey! don't worry. We ensure secure transection</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ----------- UPPER PRODUCT SHOW CASE  -----------*/}
            <UpperShowCase />

            {/* ----------- CTA SECTION -----------*/}
            <CtaHome />

            {/* ----------- HOME SLIDER -----------*/}
            <HomeSlider />

            {/* ----------- TESTIMONIAL -----------*/}
            <Testimonial />



        </>
    )
}

export default Home

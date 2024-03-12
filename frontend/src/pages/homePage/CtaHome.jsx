import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

const CtaHome = () => {

    return (
        <section className='container mx-auto pt-14 pb-4'>
            <div className="px-4 py-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-800 xl:text-4xl">
                    Try something really different right now.
                </h2>
                <p className="mt-4 block max-w-4xl text-gray-500">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse iure tenetur commodi ipsam
                    error voluptate magni. Adipisci repudiandae ullam commodi iusto reprehenderit suscipit
                    facere voluptatem, eaque maiores minima. Neque, officiis.
                </p>


                <div className="mt-6">
                    <button className='bg-gray-900 my-1 hover:bg-gray-800 text-white px-5 py-2.5 rounded-md mr-6'>Shop Now</button>
                    <button className='bg-[#FFC522] my-1 hover:bg-[#ffd257] px-5 py-2.5 rounded-md mr-6'>Trending Products</button>
                </div>
            </div>
        </section>
    )
}


export default CtaHome

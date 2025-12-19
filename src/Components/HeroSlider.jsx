import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import heroImg1 from '../assets/slide_1.png'
import heroImg2 from '../assets/slide_2.avif'
import heroImg3 from '../assets/slide_3.jpg'

import {Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';




const slides = [
    {
        image: heroImg1,
        title: "Empowering Dreams with Easy Microloans",
        text: "Fast approval • Flexible EMI • Trusted Platform",
        button: "Apply for Loan",
        path: "/all-loans",
    },
    {
        image: heroImg2,
        title: "Grow Your Business with Smart Financing",
        text: "Low interest • Business-friendly terms",
        button: "Explore Business Loans",
        path: "/business-loan",
    },
    {
        image: heroImg3,
        title: "Invest in Your Future Today",
        text: "Education & personal loan solutions",
        button: "View Loan Details",
        path: "/loan-details",
    }
]
const HeroSlider = () => {
    return (
        <Swiper
        direction="vertical"
            modules={[Autoplay, Pagination]}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            loop={true}
            pagination={{
                clickable: true,
            }}
            className="w-full h-[400px] md:h-[550px] lg:h-[650px]"
        >
            {
                slides.map((slide, i) =>
                    <SwiperSlide key={i}>
                        <div className='relative w-full h-full'>
                            <img src={slide.image} alt="" className='w-full h-full object-cover object-center brightness-75' />
                            <div className='absolute inset-0 flex justify-center items-end  md:items-center pt-60'>
                                <div className='text-center text-white px-4 max-w-2xl '>
                                    <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold mb-4'>
                                        {slide.title}
                                    </h1>
                                    <p className="mb-6 text-sm md:text-lg">
                                    {slide.text}
                                    </p>
                                    <a
                                    href={slide.path}
                                    className="btn btn-primary"
                                    >
                                    {slide.button}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                )
            }

        </Swiper>
    );
};

export default HeroSlider;
"use client"
import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

import banner_1 from '@images/banners/banner-1.png';
import banner_2 from '@images/banners/banner-2.jpg';
import banner_3 from '@images/banners/banner-3.png';

const slides = [banner_1, banner_2, banner_3];

function HomeSlider () {
  return (
    <>
    <Swiper
      cssMode={true}
      navigation={true}
      pagination={true}
      mousewheel={true}
      keyboard={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Navigation, Pagination, Mousewheel, Keyboard,Autoplay]}
      className="mySwiper h-60 md:h-96 w-full"
    >
      {slides.map((banner, index) => {
        return (
          <SwiperSlide key={index}>
          <img src={banner.src} alt="slide 1" className='size-full object-cover' />
        </SwiperSlide>
        )
      })}

    </Swiper>
  </>
  );
};
export default HomeSlider

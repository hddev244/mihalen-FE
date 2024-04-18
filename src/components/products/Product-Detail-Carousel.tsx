"use client"
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Image as IMG } from '@/lib/object';
import { getImage } from '@/lib/imageUtil';
import Image from 'next/image';

interface Props {
    className?: string;
    images: IMG[];
}

function ProductDetailCarousel(props: Props) {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  
    return (
        <>
        <div className='space-y-4 md:p-8 pt-0 w-full '>
            <div className='w-full'>
                <Swiper
                  loop={true}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2 aspect-square"
                > 
                {props.images.map((image) => (
                    <SwiperSlide key={image.id} className=''>
                    <Image 
                    width={500}
                    height={500}
                    alt={image.name} src={getImage(image.id)} 
                    className='aspect-square' />
                  </SwiperSlide>))
                }
    
                        
                  
                </Swiper>
            </div>
            <div className='p-2'>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className=""
                >
                  {props.images.map((image) => (
                    <SwiperSlide key={image.id} className=''>
                      <Image 
                        width={500}
                        height={500}
                        className='aspect-square object-cover' 
                        src={getImage(image.id)} 
                        alt={image.name} />
                    </SwiperSlide>
                  ))}
                </Swiper>
            </div>
        </div>
      </>
    );
}

export default ProductDetailCarousel;
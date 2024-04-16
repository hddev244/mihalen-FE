"use client";
import { Product } from "@/lib/object";
import CartItem from "../Common/CardProductItem";
import React, { Suspense } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel, Keyboard, Pagination } from 'swiper/modules';
import CartItemLoading from "../Common/CardItem-loading";
import CardProductItem from "../Common/CardProductItem";
import { Localstorage } from "@/lib/store";


const products: any[] = Localstorage.VIEWED_PRODUCTS ? JSON.parse(localStorage.getItem(Localstorage.VIEWED_PRODUCTS) || "[]") : [];
function ViewedProduct() {
    return (
        <div className="w-full lg:w-max m-auto py-10 px-4">
            <h3 className="text-2xl py-2 font-semibold text-themeColor">Sản phẩm đã xem</h3>
            <div className="">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={10}
                    breakpoints={{
                        340: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                          },
                        640: {
                          slidesPerView: 4,
                          spaceBetween: 20,
                        },
                        768: {
                          slidesPerView: 5,
                          spaceBetween: 20,
                        },
                        1024: {
                          slidesPerView: 6,
                          spaceBetween: 30,
                        },
                      }}
                    cssMode={true}
                    navigation={true}
                    mousewheel={true}
                    keyboard={true}
                    modules={[Navigation, Mousewheel, Keyboard,Pagination]}
                    className="mySwiper w-full"
                >
                    {
                        products && (
                            products.map((product) => {
                                return (
                                    <SwiperSlide 
                                        key={product.id}
                                    >
                                        <Suspense fallback={<CartItemLoading/>}>
                                        <CardProductItem
                                            id={product.id || 0} // Fix: Add default value of 0 for id prop
                                            name={product.name}
                                            price={product.price}
                                            thumbnail={product.thumbnail}
                                            />
                                        </Suspense>
                                    </SwiperSlide>
                                )
                            }
                            ))
}
                </Swiper>

            </div>
        </div>
    );
}
export default ViewedProduct;
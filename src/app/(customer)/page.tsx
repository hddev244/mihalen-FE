"use client";
import HomeSlider from "@/components/carousels/Carousel";
import Image from "next/image";
import banner_2 from "@images/banners/banner-2.jpg";
import Link from "next/link";
import CardProductItem from "@/components/Common/CardProductItem";
import ServiceComponent from "@/components/home/ServiceComponent";
import { Category, Product } from "@/lib/object";
import { getImage } from "@/lib/imageUtil";
import { BASE_API_URL } from "@/api/api-info";
import React, { useEffect, useState } from "react";
import { NextPage } from 'next';


const Home: NextPage = () =>
{
  const [products, setProducts] = useState<Product[]>();
  const [categories, setCategories] = useState<Category[]>();
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`${BASE_API_URL}/api/admin/categories/pages?index=0&size=10`);
      const jsonData = await res.json();
      setCategories(jsonData.data.content);
    };
    fetchCategories();
  }, []);
  useEffect(() => {
            const fetchData = async (retry = 3) => {
      
                try {
                  const url = `${BASE_API_URL}/api/product/pages?index=0&size=10`;
                  const response = await fetch(url, {
                      method: "GET",
                  });
                  if (response.ok) {
                      const responseData = await response.json();
                      setProducts(responseData.data.content);
                  } else {
                  }
              } catch (error) {
              }
            };
            fetchData();
}, []);
  return (
    <>
      <HomeSlider></HomeSlider>
      { /**Danh mục sản phẩm*/}
      <div className="lg:w-max m-auto">
        <section className="py-4  border-b ">
          <h2 className="text-3xl font-semibold text-themeColor text-center">Name</h2>
          <p className="text-center">Gift shop</p>
          <p className="text-center text-xl font-semibold">DANH MỤC SẢN PHẨM</p>
          <div className="grid sm:grid-cols-4 gap-8 lg:grid-cols-6 grid-cols-2 p-4  ">
            {categories && categories?.map((item) => (
              <Link key={item.id} href={`/products/category/${item.id}`} className="hover:scale-110 hover:cursor-pointer transition-transform duration-300 ease-in-out">
                <Image 
                  src={item.thumbnail?.id ? getImage(item.thumbnail.id) : ''} 
                  width={200}
                  height={200}
                  alt={item.name}
                  className="w-full aspect-square object-cover rounded-full border shadow-lg" />
                <h3 className="text-lg font-semibold pt-4 text-center">{item.name}</h3>
                <p className="text-center">8 sản phẩm</p>
              </Link>
            ))}
          </div>
        </section>
        { /**Giảm giá sốc*/}
        <section className="py-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="md:text-3xl text-2xl font-semibold text-themeColor">Giảm giá sốc</h2>
            <div className="flex items-center space-x-2">
              <p>Kết thúc sau </p>
              <div className="md:h-16 md:w-12 h-14 w-10  flex flex-col justify-center md:justify-between items-center md:p-2  rounded-md  bg-yellow-400">
                <span className="md:text-xl text-lg font-semibold" >00</span>
                <span className="text-sm">giờ</span>
              </div>
              <div className="md:h-16 md:w-12 h-14 w-10  flex flex-col justify-center md:justify-between items-center md:p-2  rounded-md  bg-yellow-400">
                <span className="md:text-xl text-lg font-semibold" >00</span>
                <span className="text-sm">phút</span>
              </div>
              <div className="md:h-16 md:w-12 h-14 w-10  flex flex-col justify-center md:justify-between items-center md:p-2  rounded-md  bg-yellow-400">
                <span className="md:text-xl text-lg font-semibold" >00</span>
                <span className="text-sm">giây</span>
              </div>
            </div>
          </div>
        </section>
        <section className="grid md:grid-cols-3 gap-8 lg:grid-cols-4 grid-cols-2 p-4  ">
          {products && products.map((item) => (
            <CardProductItem
              key={item.id}
              id={item.id ?? 0}
              name={item.name}
              price={item.price}
              thumbnail={item.thumbnail?.id ? getImage(item.thumbnail.id) : ''}
            />
          ))}
        </section>
        <section className="w-full">
          { /**Banner 2*/}
          <Image
            src={banner_2}
            className="aspect-[3] py-4 object-cover w-full"
            alt="banner-2"
            width={1920}
            height={1080}
             />
          {/* Sản phẩm bán chạy */}
          <div className="flex justify-between items-center px-2 pt-4">
            <h2 className="md:text-3xl text-2xl font-semibold text-themeColor">Sản phẩm bán chạy</h2>
            <Link href="/products/best-seller" className="text-sm underline">Xem tất cả</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:grid-cols-4 grid-cols-2 p-4  ">
          {products && products.map((item) => (
            <CardProductItem
              key={item.id}
              id={item.id ?? 0}
              name={item.name}
              price={item.price}
              thumbnail={item.thumbnail?.id ? getImage(item.thumbnail.id) : ''}
            />
          ))}
          </div>
        </section>
        <ServiceComponent />
      </div>
    </>
  );
}

export default Home;
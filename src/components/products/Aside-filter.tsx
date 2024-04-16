"use client"

import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";

function AsideFilter(
    {handleToggle}:
    {
        handleToggle: () => void;
    }
) {
  return (
   <>
    <div onClick={() => handleToggle()} className="md:hidden z-10 fixed top-0 left-0 right-0 bottom-0 bg-[#5c5c5ca4]">
   </div>
   <aside className="aside-filter md:block md:relative md:size-auto fixed top-0 right-0 w-3/4 h-dvh z-20 bg-white p-4 ">
    <div>
        <button onClick={() => handleToggle()} className="md:hidden"><CgClose/></button>
        <h2 className="text-2xl m-4">Filter</h2>
        <h3 className="uppercase text-xl">Mức giá</h3>
        <ul className="my-2">
            <li className="flex items-center space-x-2">
                <input type="checkbox" id="price1" name="price" value="price1" />
                <label htmlFor="price1">Dưới 100.000đ</label>
            </li>
            <li className="flex items-center space-x-2">
                <input type="checkbox" id="price2" name="price" value="price2" />
                <label htmlFor="price2">100.000đ - 200.000đ</label>
            </li>
            <li className="flex items-center space-x-2">
                <input type="checkbox" id="price3" name="price" value="price3" />
                <label htmlFor="price3">200.000đ - 500.000đ</label>
            </li>
            <li className="flex items-center space-x-2">
                <input type="checkbox" id="price4" name="price" value="price4" />
                <label htmlFor="price4">500.000đ - 1.000.000đ</label>
            </li>
            <li className="flex items-center space-x-2">
                <input type="checkbox" id="price5" name="price" value="price5" />
                <label htmlFor="price5">Trên 1.000.000đ</label>
            </li>
        </ul>
        <h3 className="uppercase text-xl mt-6">loại</h3>
        <ul className="my-2">
            <li className="flex items-center space-x-2">
                <input type="checkbox" id="category1" name="category" value="category1" />
                <label htmlFor="category1">Hoa tươi</label>
            </li>
            <li className="flex items-center space-x-2">
                <input type="checkbox" id="category2" name="category" value="category2" />
                <label htmlFor="category2">Hoa giấy</label>
            </li>
            <li className="flex items-center space-x-2">
                <input type="checkbox" id="category3" name="category" value="category3" />
                <label htmlFor="category3">Hoa gỗ</label>
            </li>
            <li className="flex items-center space-x-2">
                <input type="checkbox" id="category4" name="category" value="category4" />
                <label htmlFor="category4">Hoa sứ</label>
            </li>
            <li className="flex items-center space-x-2">
                <input type="checkbox" id="category5" name="category" value="category5" />
                <label htmlFor="category5">Hoa nhựa</label>
            </li>
        </ul>
        <button className="w-full h-10 my-4 bg-themeColor text-white">Lọc</button>
    </div>
    </aside>
   </>
    );
}
export default AsideFilter;
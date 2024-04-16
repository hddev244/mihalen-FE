"use client"
import React, { useState } from 'react';

function AddToCartAndBuynow({ productId }: { productId: number }) {
    const [qty, setQty] = useState(1);

    const handleIncrement = () => {
        setQty(qty + 1);
    }

    const handleDecrement = () => {
        if (qty > 1) {
            setQty(qty - 1);
        }
    }
    function handleAddToCart() {
        alert(`Thêm ${productId} sản phẩm vào giỏ hàng với số lượng ${qty}`);
    }
    const handleBuyNow = () => {
        alert(`Mua ngay ${productId
            } sản phẩm với số lượng ${qty}`);
    }
    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="border-red-600 flex justify-between items-center  rounded-md border col-span-4 p-2 ">
                <button onClick={handleDecrement} className="aspect-square h-full text-lg">-</button>
                <span>{qty}</span>
                <button onClick={handleIncrement} className="aspect-square h-full text-lg">+</button>
            </div>
            <button
                onClick={handleAddToCart}
                className="text-red-600 p-2 border-red-600  border text-xl font-semibold col-span-8 rounded-md">Thêm vào giỏ hàng</button>
            <button onClick={handleBuyNow}
                className="bg-red-600 text-white p-2  text-xl font-semibold col-span-12 rounded-md">
            Mua ngay</button>
            </div>
    );
}

export default AddToCartAndBuynow
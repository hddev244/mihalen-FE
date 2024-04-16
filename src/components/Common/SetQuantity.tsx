"use client"
import React, { useState } from 'react';
import Message from './alert-message';
import { BASE_API_URL } from '@/api/api-info';
import { Localstorage } from '@/lib/store';
import { MessageType } from '@/lib/object';
import { useRouter } from 'next/navigation';

function AddToCartAndBuynow({ productId }: { productId: number }) {
    const [qty, setQty] = useState(1);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<MessageType>();
    const [showMessage, setShowMessage] = useState(false);

    const rounter = useRouter();

    const handleAddToCart = async () => {
        try {
            const fetchUrl = `${BASE_API_URL}/api/cart/add?productId=${productId}&quantity=${qty}`;
            const token = localStorage.getItem(Localstorage.TOKEN);
            if (!token) {
                setMessage('Vui lòng đăng nhập để thêm vào giỏ hàng');
                setMessageType('warning');
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 3000);
                return;
            }
            const response = await fetch(fetchUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            console.log('Add to cart');
            const responseData = await response.json();
            console.log(responseData)
            if (response.ok) {
                setMessage(responseData.message);
                setMessageType('success');
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 3000);

            } else {
                setMessage(responseData.message);
                setMessageType('error');
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 3000);
            }
        } catch (error) {
            setMessage('Thêm vào giỏ hàng thất bại 11');
            setMessageType('error');
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        }
    }

    const handleIncrement = () => {
        setQty(qty + 1);
    }

    const handleDecrement = () => {
        if (qty > 1) {
            setQty(qty - 1);
        }
    }

    const handleBuyNow = () => {
        handleAddToCart();
        rounter.push('/cart');
    }
    return (
        <>
            {showMessage && <Message message={message} type={messageType} />}
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
        </>
    );
}

const MarkClickToBack = () => {

    return (
        <div
            onClick={() => {
                window.history.back();
            }}
            className="fixed bg-[#50505056] w-dvw z-[999] h-dvh top-0 left-0">
        </div>
    )
}

export { AddToCartAndBuynow, MarkClickToBack }

export default AddToCartAndBuynow
import { BASE_API_URL } from '@/api/api-info';
import { formatCurrency } from '@/lib/format';
import { Localstorage } from '@/lib/store';
import { Skeleton } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import React, { Suspense, useState } from 'react';
import { BiCartAdd } from 'react-icons/bi';
import { BsEye } from 'react-icons/bs';
import Message from './alert-message';
import { MessageType } from '@/lib/object';
import Image from 'next/image';

interface CardItemProps {
    id: number;
    name: string;
    price: number;
    thumbnail?: string;
}

function CardProductItem({ id, name, price, thumbnail }: CardItemProps) {
    const router = useRouter();
    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<MessageType>();
    const [showMessage, setShowMessage] = useState<boolean>(false);

    const handleClick = () => {
        const productsStore: any = localStorage.getItem(Localstorage.VIEWED_PRODUCTS);
        const product = {
            id,
            name,
            price,
            thumbnail,
        }
        if (productsStore) {
            let products: any[] = JSON.parse(productsStore);
            if (products.find(item => item.id === id)) {
            } else {
                products.push(product);
                localStorage.setItem(Localstorage.VIEWED_PRODUCTS, JSON.stringify(products));
            }
        } else {
            let products: any[] = []; // Initialize the products array
            products.push(product);
            localStorage.setItem(Localstorage.VIEWED_PRODUCTS, JSON.stringify(products));
        }
        router.push(`/products/${id}`);
    }

    const handleAddToCart = async () => {
        try {
            const fetchUrl = `${BASE_API_URL}/api/cart/add?productId=${id}&quantity=1`;
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
    return (
        <div>
            {showMessage && <Message message={message} type={messageType} />}
            <div className='relative border-gray-200 hover:scale-95 mb-2 transition-transform duration-300 cursor-pointer'>
                <Suspense fallback={
                    <Skeleton className="h-full aspect-square p-2">
                        <div className=" h-fullrounded-lg bg-default-300"></div>
                    </Skeleton>
                }>
                    <Image
                        width={200}
                        height={200}
                        className='w-full aspect-square object-cover border '
                        src={thumbnail ? thumbnail : 'https://via.placeholder.com/150'}
                        alt={name} />
                </Suspense>
                <div className='absolute h-10 md:h-14 md:space-x-6 flex space-x-4 justify-center items-center left-0 bottom-0 bg-[#797979a8] w-full'>
                    <button
                        onClick={() => handleAddToCart()}
                        className="text-gray-200 block text-xl md:text-2xl hover:text-white hover:scale-150 transition-transform duration-250 ease-in-out"><BiCartAdd /></button>
                    <button
                        onClick={handleClick}
                        className="text-gray-200 block text-xl md:text-2xl hover:text-white hover:scale-150 transition-transform duration-250 ease-in-out"><BsEye /></button>
                </div>
            </div>
            <h3>{name}</h3>
            <p>Giá {formatCurrency(price)} vnđ</p>
        </div>
    );
}

export default CardProductItem;
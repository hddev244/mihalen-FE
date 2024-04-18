import type { CartItem } from '@/lib/object';
import { height } from '@fortawesome/free-brands-svg-icons/fa42Group';
import { Skeleton } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react';
import { BiCartAdd } from 'react-icons/bi';
import { BsEye } from 'react-icons/bs';
import { CgRemove } from 'react-icons/cg';
import { FiDelete } from 'react-icons/fi';
import { IoRemove } from 'react-icons/io5';

interface CardItemProps {
    cartItem?: CartItem;
    size?: number;
}

function CartItem(props: CardItemProps) {
    return (
        <div className='w-full bg-red-200 flex p-2 rounded-lg border relative'
            style={{height: props.size ? props.size+"px" : "132px"}}
        >
            <Image className='aspect-square h-full rounded-lg object-cover' src={`https://picsum.photos/200/300?random=${props.cartItem?.quantity}`} alt={props.cartItem?.product.name||""} />
            <div className='w-2/3 h-full flex flex-col justify-center items-center'>
                <h3>{props.cartItem?.product.name}</h3>
                <p>Price: {props.cartItem?.product.price || 0} vnđ</p>
                <div className='flex space-x-4'>
                    <button className="text-gray-200 block text-xl md:text-2xl hover:text-white hover:scale-150 transition-transform duration-250 ease-in-out"><BiCartAdd /></button>
                </div>
            </div>
            <button className='absolute top-0 right-0'>
                <FiDelete />
            </button>
        </div>
    );
}

export default CartItem;
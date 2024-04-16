"use client";
import CardProductItem from '@/components/Common/CardProductItem';
import AsideFilter from '@/components/products/Aside-filter';
import { Product } from '@/lib/object';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import { copyTracedFiles } from 'next/dist/build/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiSkipNext } from 'react-icons/bi';
import { MdNavigateNext } from 'react-icons/md';

const ProductByCategoryPage = ({
    categoryId,
}: {
    categoryId: string;
}) => {

    const products: Product[] = [
        {
            id: 1,
            name: "Hoa khô",
            price: 100,
            category: {
                id: "1",
                name: "Hoa"
            },
        },
        {
            id: 2,
            name: "Hoa tươi",
            price: 200,
            category: {
                id: "1",
                name: "Hoa"
            },
        },
        {
            id: 3,
            name: "Hoa giấy",
            price: 300,
            category: {
                id: "1",
                name: "Hoa"
            },
        },
        {
            id: 4,
            name: "Hoa gỗ",
            price: 400,
            category: {
                id: "1",
                name: "Hoa"
            },
        },
        {
            id: 5,
            name: "Hoa sứ",
            price: 500,
            category: {
                id: "1",
                name: "Hoa"
            },
        },
        {
            id: 6,
            name: "Hoa nhựa",
            price: 600,
            category: {
                id: "1",
                name: "Hoa"
            },
        },
    ];
    const [showFilter, setShowFilter] = useState(false);
   
    const changeShowFilter = () => {
        console.log(showFilter);
        setShowFilter(!showFilter);
    }
    useEffect(() => {
        if(window.innerWidth > 768) {
            setShowFilter(true);
        }
    } , [])

    return (
        <div className='px-2'>
            <ol className='flex items-center text-xl font-medium my-6'>
                <li><Link href='/'>Trang chủ</Link></li>
                <MdNavigateNext />
                <li><Link href='/products/'>Sản phẩm</Link></li>
                <MdNavigateNext />
                <li><Link href={`/products/categori/${categoryId}`}>{categoryId}</Link></li>
            </ol>
            <div className='flex justify-between my-4'>
                <h2 className='text-2xl'>Category: {categoryId}</h2>
                <div className='w-32 bg-gray-500'>
                    <button onClick={changeShowFilter} className='w-full h-10 bg-gray-500 text-white md:hidden'>Filter</button>
                </div>
            </div>
            <div className='flex md:gap-6'>   
                { showFilter && <AsideFilter handleToggle={changeShowFilter} />}
                <section className='flex-1 md:ps-6 lg:ps-10'>
                    {products.length > 0 ? (
                        <ul className='grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 w-full gap-2 md:gap-4'>
                            {products.map((product) => (
                                <li key={product.id}>
                                    <CardProductItem
                                        id={product.id || 0}
                                        name={product.name}
                                        price={product.price}
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No products found for this category.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default ProductByCategoryPage;
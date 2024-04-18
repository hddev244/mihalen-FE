"use client";
import { BASE_API_URL } from '@/api/api-info';
import CardProductItem from '@/components/Common/CardProductItem';
import AsideFilter from '@/components/products/Aside-filter';
import { getImage } from '@/lib/imageUtil';
import { Product } from '@/lib/object';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import { copyTracedFiles } from 'next/dist/build/utils';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdNavigateNext } from 'react-icons/md';

const ProductByCategoryPage = ({params} : {
    params: {
        categoryId: string;
        category_name: string;
    }
}) => {
    const par = useParams();
    console.log(par);
    const [products, setProducts] = useState<Product[]>();
    useEffect(() => {
        const fetchData = async (retry = 3) => {
            try {
                const url = `${BASE_API_URL}/api/product/category/${params.categoryId}`;
                // const url = `${BASE_API_URL}/api/product/category/${categoryId}?index=0&size=10`;
              const response = await fetch(url, {
                  method: "GET",
              });
              if (response.ok) {
                  const responseData = await response.json();
                  setProducts(responseData.data.content);
                  console.log(responseData);
              } else {
              }
          } catch (error) {
          }
        };
        fetchData();
}, [params.categoryId]);
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
                <li><Link href={`/products/categori/${params.categoryId}`}>{params.categoryId}</Link></li>
            </ol>
            <div className='flex justify-between my-4'>
                <h2 className='text-2xl'>{params.category_name}</h2>
                <div className='w-32 bg-gray-500'>
                    <button onClick={changeShowFilter} className='w-full h-10 bg-gray-500 text-white md:hidden'>Filter</button>
                </div>
            </div>
            <div className='flex md:gap-6'>   
                { showFilter && <AsideFilter handleToggle={changeShowFilter} />}
                <section className='flex-1 md:ps-6 lg:ps-10'>
                    {products&& products.length > 0 ? (
                        <ul className='grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 w-full gap-2 md:gap-4'>
                            {products.map((product) => (
                                <li key={product.id}>
                                    <CardProductItem
                                        id={product.id || 0}
                                        name={product.name}
                                        price={product.price}
                                        thumbnail={product.thumbnail?.id ? getImage(product.thumbnail.id) : ''}
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
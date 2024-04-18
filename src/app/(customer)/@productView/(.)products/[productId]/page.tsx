"use client"
import { BASE_API_URL } from "@/api/api-info";
import AddToCartAndBuynow, { MarkClickToBack } from "@/components/Common/SetQuantity";
import ProductDetailCarousel from "@/components/products/Product-Detail-Carousel";
import { formatCurrency } from "@/lib/format";
import { Product } from "@/lib/object";
import { Localstorage } from "@/lib/store";
import { Progress } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BiGift } from "react-icons/bi";
import { FaFire } from "react-icons/fa";



function Page({ params }: {
    params: {
        productId: number
    }
}) {
    const [showView,setShowView] =useState(true);
    const [product, setProduct] = useState<Product>();
    useEffect(() => {
        const fetchProduct = async (): Promise<void> => {
            const fetchUrl = `${BASE_API_URL}/api/product/findById/${params.productId}`;
            const res = await fetch(fetchUrl);
            const resData = await res.json();
            const  product = resData.data;
            setProduct(product);
        }

        fetchProduct();
    },[params.productId]);

    
    const show = () => {
        setShowView(false);
    }
    return showView && product &&(
        <>
            <MarkClickToBack />
            {/* <div className="fixed bg-[#50505056] w-dvw z-[99999] h-dvh top-0 left-0 flex justify-center items-center"> */}
                <div className="bg-white w-[80%] lg:w-max max-h-[90vh] overflow-y-auto p-4 z-[999999] rounded-lg fixed translate-y-[-50%] translate-x-[-50%] left-[50%] top-[50%]">
                    <div className="grid grid-cols-1 md:grid-cols-2 ">
                        {/* image  */}
                        <div className="w-full aspect-square">
                            <ProductDetailCarousel images={product.images || []} />
                        </div>
                        <div className="flex flex-col space-y:4  md:p-8  md:space-y-10">
                            <div>
                                <h1 className="text-2xl font-bold">{product.name}</h1>
                                <p className="inline me-3"><span>Phân loại</span>: <i>{product.category.name}</i></p>
                                <p className="inline"><span>Mã sản phẩm : </span> <i>{product.id}</i></p>
                                <p>
                                    {product.description}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className=" justify-between items-center bg-red-50 p-1 rounded-sm  hidden md:flex">
                                    <span className="text-lg text-red-500 font-bold uppercase">giảm sốc 50%</span>
                                    <div className="flex items-center space-x-2">
                                        <span>kết thúc sau: </span>
                                        <span className="flex items-center justify-center font-semibold rounded-md bg-black size-8 text-medium text-white">14</span>
                                        <span className="flex items-center justify-center font-semibold rounded-md bg-black size-8 text-medium text-white">23</span>
                                        <span className="flex items-center justify-center font-semibold rounded-md bg-black size-8 text-medium text-white">45</span>
                                    </div>
                                </div>
                                <div className="space-y-2 hidden md:block">
                                    <div className="flex items-center">
                                        <FaFire className="text-red-500 text-2xl me-2" />
                                        <span className="text-red-500 text-lg font-semibold">Sắp cháy hàng</span>
                                    </div>
                                    <Progress aria-label="Loading..." value={95} color="danger" className="" />
                                </div>
                                <div className="flex items-center p-4 space-x-2">
                                    <span className="text-3xl font-semibold text-red-500">{formatCurrency(product.price)} đ</span>
                                    <span className="line-through text-gray-500">{formatCurrency(product.price * 2)} đ</span>
                                </div>
                                <button
                                    onClick={() => {
                                        window.location.reload();
                                    }}
                                    className=" italic text-blue-500 text-xl">xem chi tiết</button>
                            
                                <div className="border border-dashed border-red-500 relative  hidden md:block">
                                    <div className="absolute translate-y-[-50%] bg-white left-4">
                                        <BiGift className="text-red-500 text-2xl me-2 inline" />
                                        <span className="text-red-500 text-xl uppercase">Khuyến mãi - ưu đãi </span>
                                    </div>
                                    <ol className="px-10 py-6 list-disc">
                                        <li>Giảm giá 50% cho tất cả sản phẩm</li>
                                        <li>Hỗ trợ 10.000 phí Ship cho đơn hàng từ 200.000đ</li>
                                        <li>Miễn phí Ship cho đơn hàng từ 300.000đ</li>
                                        <li>Đổi trả trong 30 ngày nếu sản phẩm lỗi bất kì</li>
                                    </ol>
                                </div>

                            </div>
                            <AddToCartAndBuynow productId={product.id || 0} show={show} />
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </>
    );
}

export default Page
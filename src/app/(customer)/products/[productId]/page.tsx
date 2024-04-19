import { BASE_API_URL } from "@/api/api-info";
import AddToCartAndBuynow from "@/components/Common/SetQuantity";
import SetQuantity from "@/components/Common/SetQuantity";
import ProductDetailCarousel from "@/components/products/Product-Detail-Carousel";
import { formatCurrency } from "@/lib/format";
import { Product } from "@/lib/object";
import { Progress } from "@nextui-org/react";
import { all } from "axios";
import { NextPage } from "next";
import Link from "next/link";
import { BiGift } from "react-icons/bi";
import { FaFire } from "react-icons/fa";
import { FcNext } from "react-icons/fc";

let product: Product = {
    id: 0,
    price: 0,
    description: "",
    category: {
        id: "",
        name: ""
    },
    name: "",
};

interface ProductDetailProps {
    productId: number
}

const Page:NextPage<{params:ProductDetailProps}> = (props) =>{
    const { params } = props;
    const fetchProduct = async (): Promise<void> => {
        const fetchUrl = `${BASE_API_URL}/api/product/${params.productId}`;
        const res = await fetch(fetchUrl);
        const resData = await res.json();
        product = resData.data;
    }

    fetchProduct();
    return (
        <>
            <div className="flex my-2 items-center space-x-2">
                <Link href="/">
                    Trang chủ
                </Link>
                <FcNext />
                <Link href="/products">
                    Sản phẩm
                </Link>
                <FcNext />
                <Link href="/products">
                    {product.name}
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 my-8">
                {/* image  */}
                <div className="w-full aspect-square">
                    <ProductDetailCarousel images={product.images || []} />
                </div>
                <div className="flex flex-col space-y-10">
                    <div>
                        <h1 className="text-2xl font-bold">{product.name}</h1>
                        <p className="inline me-3"><span>Phân loại</span>: <i>{product.category.name}</i></p>
                        <p className="inline"><span>Mã sản phẩm : </span> <i>{product.id}</i></p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-red-50 p-1 rounded-sm">
                            <span className="text-lg text-red-500 font-bold uppercase">giảm sốc 50%</span>
                            <div className="flex items-center space-x-2">
                                <span>kết thúc sau: </span>
                                <span className="flex items-center justify-center font-semibold rounded-md bg-black size-8 text-medium text-white">14</span>
                                <span className="flex items-center justify-center font-semibold rounded-md bg-black size-8 text-medium text-white">23</span>
                                <span className="flex items-center justify-center font-semibold rounded-md bg-black size-8 text-medium text-white">45</span>
                            </div>
                        </div>
                        <div className="space-y-2">
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
                        <div className="border border-dashed border-red-500 relative">
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
                    <AddToCartAndBuynow productId={product.id || 0} />
                </div>
            </div>
        </>
    );
}

export default Page
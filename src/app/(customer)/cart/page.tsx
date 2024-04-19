
"use client";
import { BASE_API_URL } from '@/api/api-info';
import getProvincies, { District, Province, Ward, getDistricts, getWards } from '@/api/api-loaction';
import OrderSuccess from '@/components/Common/OrderSuccess';
import { formatCurrency } from '@/lib/format';
import { getImage } from '@/lib/imageUtil';
import { CartItem, MessageType, OrderInfoSuccess, Product } from '@/lib/object';
import { Localstorage } from '@/lib/store';
import { Card, CardHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { RiDeleteBin6Fill } from 'react-icons/ri';

interface OrderItem {
    cartItemID: number,
    product: Product,
    quantity: number,
}

interface address {
    province:string,
    district: string,
    ward: string,
    address: string,
}
let address: address = {
    province: "",
    district: "",
    ward: "",
    address: ""
};
interface Order {
    name: string,
    phoneNumber: string,
    address: string,
    cartItemID: number[],
}

let order: Order = {
    name: "",
    phoneNumber: "",
    address: "",
    cartItemID: []
}

const CartPage:NextPage = () => {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [street, setStreet] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [orderInfo, setOrderInfo] = useState<OrderInfoSuccess>();
    const [showOrderSuccess, setShowOrderSuccess] = useState(false);

    const [showMessage, setShowMessage] = useState(false);
    const [Message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<MessageType>();
    const [cartPage, setCartPage] = useState<CartItem[]>();
    const [totalProduct, setTotalProduct] = useState<number>(0);
    const [productOrders, setProductOrders] = useState<OrderItem[]>([]);

    useEffect(() => {
        const fetchProvinces = async () => {
            const data = await getProvincies();
            setProvinces(data);
        }
        fetchProvinces();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem(Localstorage.TOKEN);
        if (!token) {
            setMessage('Vui lòng đăng nhập để thêm vào giỏ hàng');
            setMessageType('warning');
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        } else {
            const fetchCart = async () => {
                const fetchUrl = `${BASE_API_URL}/api/cart/pages?page=0&size=10`;
                const response = await fetch(fetchUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': token
                    }
                });
                const fetchdata = await response.json();
                if (response.ok) {
                    setTotalProduct(fetchdata.totalElements);
                    setCartPage(fetchdata.content);
                }
            }
            fetchCart();
        }
    },
        [orderInfo]);
    const handleCheckItem = (product: Product, quantity: number,cartId:number) => {
        const productOrder = {
            cartItemID: cartId,
            product: product,
            quantity: quantity
        }
        if (productOrders.find(item => item.product.id === product.id)) {
            const newProductOrders = productOrders.filter(item => item.product.id !== product.id);
            setProductOrders(newProductOrders);
        } else {
            setProductOrders([...productOrders, productOrder]);
        }
    }

    const changeProvince = async (province_id: string) => {
        const data = await getDistricts(province_id);
        setDistricts(data);
        setWards([]);
        const province = provinces.find(item => item.province_id === province_id) ?? null;
        address.province = province?.province_name ?? "";
        address.district = "";
        address.ward = "";
        console.log(address);
        

    }

    const changeDistrict = async (district_id: string) => {
        const data = await getWards(district_id);
        setWards(data);
        const district = districts.find(item => item.district_id === district_id) ?? null;
        address.district = district?.district_name ?? "";
        address.ward = "";
        console.log(address);
        
    }

    const changeWard = (ward_id: string) => {
        const ward = wards.find(item => item.ward_id === ward_id) ?? null;
        address.ward = ward?.ward_name ?? "";
        console.log(address);
    }

    const handleOrder = () => {
        const token = localStorage.getItem(Localstorage.TOKEN);
        if(token){
            order.cartItemID = [];
            productOrders.forEach(item => {
                order.cartItemID.push(item.cartItemID);
            });
            order.address = address.address+ ', ' + address.ward + ', ' + address.district + ', ' +address.province   ;
            console.log(order);
            
            const fetchOrder = async () => {
                const response = await fetch(`${BASE_API_URL}/api/orders/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify(order)
                });
                if (response.ok) {
                    const fetchData = await response.json();
                    console.log(fetchData);
                    setOrderInfo(fetchData.data);
                    setShowOrderSuccess(true);
                } else {
                    setMessage('Đặt hàng thất bại');
                    setMessageType('error');
                    setShowMessage(true);
                    setTimeout(() => {
                        setShowMessage(false);
                    }, 3000);
                }
            }
            fetchOrder();

        } else {
            setMessage('Vui lòng đăng nhập để đặt hàng');
            setMessageType('warning');
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        }
    }


    return (
        <>
        {showOrderSuccess && <OrderSuccess orderInfo={orderInfo} close={() => {
            setShowOrderSuccess(false);
            setProductOrders([]);
        }} />}
        <div className='lg:w-max py-10 m-auto'>
            {cartPage ? (
                <>
                    <h1 className='text-3xl  font-bold text-center'>Giỏ hàng</h1>
                    <div className=''>
                        <p>{totalProduct} sản phẩm</p>
                        <div className='w-full  grid grid-cols-2 gap-4'>
                            <Table
                                className='col-span-1'
                                aria-label="Example static collection table">
                                <TableHeader>
                                    <TableColumn>Hình ảnh</TableColumn>
                                    <TableColumn>Thông tin</TableColumn>
                                    <TableColumn>Số lượng</TableColumn>
                                    <TableColumn>Giá</TableColumn>
                                    <TableColumn>Thành tiền</TableColumn>
                                    <TableColumn><i></i></TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {
                                        cartPage && cartPage.map((item) => {
                                            return (
                                                <TableRow key={item.id}>
                                                    <TableCell>
                                                        <Image
                                                            width={80}
                                                            height={80}
                                                            className='size-14 object-cover'
                                                            src={getImage(item.product.thumbnail?.id ?? 0)} alt='product' />
                                                    </TableCell>
                                                    <TableCell>
                                                        <p>{item.product.name}</p>
                                                        <p className='line-clamp-2'>{item.product.description}</p>
                                                        <button className='text-red-500 text-lg '
                                                        ><RiDeleteBin6Fill />
                                                        </button>
                                                    </TableCell>
                                                    <TableCell>{formatCurrency(item.quantity)}</TableCell>
                                                    <TableCell>{formatCurrency(item.product.price)}</TableCell>
                                                    <TableCell>{formatCurrency(item.product.price * item.quantity)}</TableCell>
                                                    <TableCell>
                                                        <input
                                                            onChange={() => { handleCheckItem(item.product, item.quantity,item.id) }}
                                                            type="checkbox" />
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                            <Card className='col-span-1' >
                                <CardHeader>
                                    <p className='text-center m-auto text-gray-700 text-2xl font-semibold py-2' >Thông tin đơn hàng</p>
                                </CardHeader>
                                <Table
                                    shadow='none'
                                >
                                    <TableHeader>
                                        <TableColumn>Sản phẩm</TableColumn>
                                        <TableColumn>Số lượng</TableColumn>
                                        <TableColumn>Thành tiền</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            productOrders && productOrders.map((item) => {
                                                return (
                                                    <TableRow key={item.product.id}>
                                                        <TableCell>{item.product.name}</TableCell>
                                                        <TableCell>{item.quantity}</TableCell>
                                                        <TableCell>{item.product.price * item.quantity}</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                                <div className='flex justify-between p-8 items-center'>
                                    <p className='text-lg font-semibold'>Tổng tiền</p>
                                    <p className='text-lg font-semibold'>{formatCurrency(productOrders.reduce((total, item) => total + item.product.price * item.quantity, 0))} đ</p>
                                </div>
                                <div className='w-full p-6 grid grid-cols-12 gap-4'>
                                <p className='text-2xl font-semibold col-span-12 m-auto py-4'>Thông tin</p>
                                    <div className='col-span-6'>
                                        <label className='text-md '>Họ và tên</label>
                                        <input 
                                            type='text' 
                                            value={name}
                                            onChange={(e) => {
                                                order.name = e.target.value
                                                setName(e.target.value)
                                            }}
                                            className='w-full p-2 border-2 border-gray-300 rounded-lg' 
                                            placeholder='Họ và tên' />
                                    </div>
                                    <div className='col-span-6'>
                                        <label className='text-md '>Số điện thoại</label>
                                        <input 
                                            value={phoneNumber}
                                            onChange={(e) => {
                                                order.phoneNumber = e.target.value
                                                setPhoneNumber(e.target.value)
                                            }}
                                            type='text' 
                                            className='w-full p-2 border-2 border-gray-300 rounded-lg' 
                                            placeholder='Số điện thoại' />
                                    </div>

                                    <p className='text-lg font-semibold pt-2 col-span-12 m-auto'>Địa chỉ nhận hàng</p>
                                    <select
                                        onChange={(e) => {changeProvince(e.target.value)}}
                                        className='col-span-4 p-2 border-2 border-gray-300 rounded-lg'>
                                        <option>Chọn tỉnh thành</option>
                                        {
                                            provinces && provinces.map((item: any) => {
                                                return (
                                                    <option className='text-gray-800' key={item.province_id} value={item.province_id}>{item.province_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <select
                                        onChange={(e) => {changeDistrict(e.target.value)}}
                                        className='col-span-4 p-2 border-2 border-gray-300 rounded-lg'>
                                        <option>Chọn quận huyện</option>
                                        {districts && districts.map((item:any) => {
                                            return (
                                                <option className='text-gray-800' key={item.district_id} value={item.district_id}>{item.district_name}</option>
                                            )
                                        })}
                                    </select>
                                    <select
                                        onChange={(e) => {changeWard(e.target.value)}}
                                        className='col-span-4 p-2 border-2 border-gray-300 rounded-lg'>
                                        <option>Chọn xã phường</option>
                                        {wards && wards.map((item:any) => {
                                            return (
                                                <option className='text-gray-800' key={item.ward_id} value={item.ward_id}>{item.ward_name}</option>
                                            )
                                        })}
                                    </select>
                                    <div className='col-span-12'>
                                        <label className='text-md '>Địa chỉ</label>
                                        <input 
                                            type='text' 
                                            value={street}
                                            onChange={(e) => { 
                                                    address.address = e.target.value
                                                    setStreet(e.target.value)}}
                                            className='w-full p-2 border-2 border-gray-300 rounded-lg' 
                                            placeholder='Địa chỉ' />
                                    </div>
                                    <button 
                                        onClick={() => {handleOrder()}}
                                        className='bg-red-500 col-span-12 font-semibold text-white p-2 rounded-lg'>
                                            Đặt hàng
                                    </button>
                                </div>

                            </Card>
                        </div>
                    </div>
                </>
            ) : (<div className='flex justify-center items-center'>
                <p className=''>Không có sản phẩm nào trong giỏ hàng</p>
            </div>)
            }
        </div>
        </>
    );
}

export default CartPage;
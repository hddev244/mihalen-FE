"use client";

import { BASE_API_URL } from "@/api/api-info";
import Message from "@/components/Common/alert-message";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { getImage } from "@/lib/imageUtil";
import { CartItem, MessageType } from "@/lib/object";
import { Localstorage } from "@/lib/store";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";


interface Order {
  id: number;
  name: string;
  cartItems: CartItem[];
  totalPrice : number;
  orderDate: string;
  phoneNumber: string;
  address: string;
}


const OrdersPage:NextPage = () => {
  const [orders, setOrders] = useState<Order[]>();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageType>("success");

  useEffect(() => {
    const token = localStorage.getItem(Localstorage.TOKEN);
    if (!token) {
      setMessage("You need to login to view orders");
      setMessageType("error");
      setShowMessage(true);
      return;
    }
    const fetchOrders = async () => {
      const response = await fetch(`${BASE_API_URL}/api/orders`, {
        headers: {
          Authorization: token,
        },
      });
      if (!response.ok) {
        setMessage("Failed to load orders");
        setMessageType("error");
        setShowMessage(true);
        return;
      }
      const res = await response.json();
      setOrders(res.data);
      console.log(res.data);
    }
    fetchOrders();
  }, []);
  return (
    <>
      {showMessage && <Message type={messageType} message={message} />}
      <div className="w-max m-auto">
        <h1 className="text-2xl py-8 text-center font-bold">Danh sách đơn hàng</h1>
        {orders ? (<>
          <Table
            className='col-span-1'
            aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Mã đơn hàng</TableColumn>
              <TableColumn>Ngày đặt hàng</TableColumn>
              <TableColumn>Số sản phẩm</TableColumn>
              <TableColumn>Số điện thoại</TableColumn>
              <TableColumn>Tổng tiền</TableColumn>
              <TableColumn>Địa chỉ nhận hàng</TableColumn>
              <TableColumn><i></i></TableColumn>
            </TableHeader>
            <TableBody>
              {
                orders && orders.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        {item.id}
                    
                      </TableCell>
                      <TableCell>{formatDateTime(item.orderDate)}</TableCell>
                      <TableCell>{item.cartItems.length}</TableCell>
                      <TableCell>{item.phoneNumber}</TableCell>
                      <TableCell>{formatCurrency(item.totalPrice)}</TableCell>
                      <TableCell>
                        {item.address}
                      </TableCell> 
                      <TableCell>
                        Xem chi tiết
                      </TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>


        </>) : (<></>)

        }
      </div>
    </>
  );
}
export default OrdersPage;
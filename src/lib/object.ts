import { image } from "@nextui-org/react";

export interface Account  {
    id: number,
    username: string,
    fullname: string,
    email: string,
    photo: string,
    address: string,
    phoneNumber: string,
    locked : boolean;
    createDate: string,
    modifiDate: string
    roles: [
        role: {
            id : string,
            name? : string
        }
    ]
}

export interface Category {
    id : string,
    name : string,
    thumbnail ?: Image
}

export interface Product  {
    id? : number,
    name : string,
    price : number,
    description ?: string,
    category : Category,
    createDate ?: string,
    modifiDate ?: string,
    images ?: Image[],
    thumbnail ?: Image,
    quantity ?: number
}

export interface Image {
    id : number,
    name : string
}

export interface Order {
    id : number,
    orderDate : string,
    status : string,
    totalPrice : number,
    account : Account,
    orderDetails : OrderDetail[]
}

export interface OrderDetail {
    id : number,
    quantity : number,
    price : number,
    product : Product
}

export interface CartItem {
    id : number,
    user : string,
    product : Product,
    quantity : number
}

export interface OrderInfoSuccess {
    id : number,
    name : string,
    orderDate : string,
    address : string,
    status : string,
    totalPrice : number,
    phoneNumber : string,
    cartItems : CartItem[]
}


export type MessageType = "success" | "error" | "warning" | "info";
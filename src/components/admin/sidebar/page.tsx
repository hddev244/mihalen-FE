"use client"
import type { NextPage } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

type pageLink = {
    href: string,
    named: string,
}

const pages: pageLink[] = [
    {
        href: "/admin/main",
        named: "Home"
    },
    {
        href: "/admin/products-manager",
        named: "Productss Management "
    }
    ,
    {
        href: "/admin/accounts-manager",
        named: "Accounts Management"
    }   
    ,
    {
        href: "/admin/orders-manager",
        named: "Orders Management"
    }
]

const Sidebar: NextPage = () => {
    const pathName = usePathname();
    
    return (
        <>
            <nav className="size-full">
                <ul className="size-full flex flex-col [&>li]:border">
                    {
                        pages.map((link,index) => {
                            const isActive = pathName.startsWith(link.href);
                            return (
                                <li key={index} className={ (isActive ? "font-bold" : "")+ 
                                                " text-2xl hover:cursor-pointer hover:bg-gray-200"}>
                                    <Link className=" py-6 text-center  block size-full" href={link.href} > {link.named} </Link>
                                </li>
                                )
                        })
                    }
                </ul>
            </nav>
        </>
    )
}

export default Sidebar
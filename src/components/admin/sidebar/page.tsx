"use client"
import type { NextPage } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Header from "@/components/admin/header/page";
import { Localstorage } from "@/lib/store";
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
    const handleLogout = () => {
        localStorage.removeItem(Localstorage.LOGGED_IN_INFO);
        localStorage.removeItem(Localstorage.TOKEN);
        location.reload();
    }
    return (
        <>
            <nav className="size-full flex flex-col justify-between">
                <div>
                    <Header></Header>
                    <ul className="w-full flex flex-col [&>li]:border">
                        {
                            pages.map((link, index) => {
                                const isActive = pathName.startsWith(link.href);
                                return (
                                    <li key={index} className={(isActive ? "font-bold" : "") +
                                        " text-2xl hover:cursor-pointer hover:bg-gray-200"}>
                                        <Link className=" py-6 text-center  block size-full" href={link.href} > {link.named} </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="p-4">
                    <button
                        onClick={handleLogout}
                        className="border p-2 px-4 size-full rounded-lg text-xl text-white bg-gray-500" >Logout
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Sidebar
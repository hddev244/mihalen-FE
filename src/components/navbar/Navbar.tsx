"use client"
import { Account } from "@/lib/object";
import { Localstorage } from "@/lib/store";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { BiUser } from "react-icons/bi";
import logo from "@images/icons/policies_icon_1.webp";

type NavLink = {
	href: string;
	title: string;
};

const navLink: NavLink[] = [
	{
		href: "/",
		title: "Trang chủ"
	},
	{
		href: "/products",
		title: "Sản phẩm"
	},
	{
		href: "/category",
		title: "Danh mục"
	},
	{
		href: "/about",
		title: "Về chúng tôi"
	},
	{
		href: "/contact",
		title: "Liên hệ"
	}
]


function Navbar({
	className, toggleVisibility, isHasToggle 
}: {
	className?: string;
	toggleVisibility?: () => void;
	isHasToggle?: boolean;
}

) {	
	const account: Account = {
		fullname: "Nguyễn Văn A",
		email: "",
		address: "",
		createDate: "",
		id: 1,
		locked: false,
		modifiDate: "",
		phoneNumber: "",
		photo: "",
		roles: [
			{
				id: "1",
				name: "ROLE_USER"
			}
		],
		username: "user"
	}

	const handleLogout = () => {
		localStorage.removeItem(Localstorage.LOGGED_IN_INFO);
		localStorage.removeItem(Localstorage.IS_LOGGED_IN);
		localStorage.removeItem(Localstorage.TOKEN);
		window.location.reload();
	}
	return (
		<>
				{isHasToggle && <div
					onClick={() => { toggleVisibility && toggleVisibility(); }}
					className="fixed z-[9999999] bg-black bg-opacity-50 w-full h-full top-0 left-0 lg:hidden"></div>
				}
				<nav className={`${className} flex-1 z-[9999999]`}>
					{/* info */}
					<div className="bg-themeColor w-full h-[4.5rem] space-x-4 flex items-center p-2 lg:hidden ">
						{account ? (<>
							<div>
								<Image
									width={32}
									height={32}
									src={logo} alt="logo"
									className="h-full border rounded-full aspect-square inline-block" />
							</div>
							<div className="inline-block">
								<p className="text-white text-sm font-semibold">{account.fullname}</p>
								<button
									onClick={() => {
										handleLogout();
									}}
									className="text-white text-xs font-[500]">Đăng xuất</button>
							</div>
						</>) : (
							<>
								<div className="h-8 mx-4 flex items-center justify-center border rounded-full aspect-square" >
									<BiUser className="text-white text-2xl" />
								</div>
								<div className="inline-block">
									<p className="text-white  font-semibold">Tài khoản</p>
									<Link
										onClick={() => { toggleVisibility && toggleVisibility(); }}
										href="/login"
										className="text-white font-[500]">Đăng nhập</Link>
								</div>
							</>
						)}
					</div>
					<ul className="lg:h-full flex flex-col  items-center justify-center p-4 lg:space-x-4 font-[600] lg:flex-row lg:p-0 lg:w-full">
						{navLink.map((item, index) => (
							<li key={index} className="hover:bg-theme-hover rounded-lg w-full lg:w-auto">
								<Link
									className="block size-full p-2 text-left lg:text-center "
									href={item.href}>
									{item.title}
								</Link>
							</li>
						))}
					</ul>
				</nav>
		</>
	);
}

export default Navbar
"use client"
import type { NextPage } from "next";
import Navbar from "../navbar/Navbar";
import Link from "next/link";
import { BiCart, BiGift, BiSearch } from "react-icons/bi";
import { useState } from "react";
import { UserTag } from "../Common/UserTag";

const Header: NextPage = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const handleVisibility = () => {
		setIsMenuOpen(!isMenuOpen);
	}
	return (
		<>
			<header className="bg-white h-16 w-full fixed top-0 left-0 z-[9999] p-2 border-b border-gray-200 shadow-sm">
				<div className="mx-auto flex justify-between items-center h-full lg:w-max  lg:gap-4 ">
					<button
						onClick={() => {
							setIsMenuOpen(true);
						}} 
						className="p-2 space-y-1 h-full aspect-square lg:hidden">
						<span className="border-2 rounded-full  border-gray-700 block w-full"></span>
						<span className="border-2 rounded-full  border-gray-700 block w-full"></span>
						<span className="border-2 rounded-full  border-gray-700 block w-full"></span>
					</button>
					<div className="flex items-center space-x-2 ">
						<Link className="text-4xl font-semibold text-red-600" href="/"><BiGift /></Link>
						<Link className="text-3xl" href="/">GIFT SHOP</Link>
					</div>
					<Navbar className="hidden lg:flex " />
					<div className="flex justify-end w-28 space-x-2 p-2">
						<div className="hidden lg:flex items-center">
						<UserTag />
						</div>
						<button className="text-2xl" ><BiSearch /></button>
						<Link className="text-2xl" href="/cart"><BiCart /></Link>
					</div>
				</div>
			</header>
			{ isMenuOpen && (
				<>
					<Navbar 
						isHasToggle={true}
						toggleVisibility={handleVisibility}
						className="fixed animate-navbarShow  flex flex-col z-50 bg-white w-4/5 h-dvh left-0 top-0 border" />
				</>
			)}
		</>
	)
}

export default Header
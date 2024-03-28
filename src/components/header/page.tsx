import type { NextPage } from "next";
import Navbar from "../navbar/page";
import { FaSearch } from "react-icons/fa";
import { FaOpencart } from "react-icons/fa6";

const Header: NextPage = () => {
	return (
		<>
			<div
				className="w-full bg-themeColor  flex flex-col justify-between  text-gray-50">
				<div
					className="w-full flex justify-center h-10 border-  z-50">
					<div
						className="w-[1080px] h-full flex justify-between [&>*]:items-center [&>*]:flex ">
						<div className="space-x-2 text-sm">
							<i className="far fa-map"></i><span className="me-2"> 137 Nguyễn Thị
								Thập - Hòa Minh - Liên Chiểu - ĐN</span> <i className="fas fa-phone"></i><span>0847
									511 175</span>
						</div>
						<div className="space-x-2">
							<a href=""><i className="fa-brands fa-square-facebook"></i></a> <a
								href=""><i className="fa-brands fa-instagram"></i></a> <a href=""><i
									className="fa-brands fa-square-twitter"></i></a>
						</div>
					</div>
				</div>
				<div className="w-full min-h-36 z-50">
					<div id="headerContainer"
						className="w-full z-50 [&>.navigation]:hover:transition-all [&>.navigation]:hover:duration-500 [&>.navigation]:hover:ease-out [&>.navigation]:hover:h-14">
						<div className=" w-full h-24  bg-themeColor flex justify-center">
							<div className="w-[1080px] h-full flex justify-between items-center  ">
								<div>
									<a href="/"><img className="h-16"
										src="/images/logos/logo-mona-2.png" alt="logo" /></a>
								</div>
								<div className="flex w-96 rounded-lg  relative">
									<input id="searchProductNav" placeholder="Tìm kiêm..." type="text"
										className="border-0 h-10 rounded-s-lg flex-1 text-gray-900" />
									<button className="px-6 bg-themeColor-btn rounded-e-lg">
										<FaSearch />
									</button>
									<div id="searchProductNav-show" className="z-50 w-96 hidden flex-col bg-gray-200 bottom-[-8px] py-2 text-black translate-y-[100%] absolute">
									</div>
								</div>
								<div className="flex space-x-4 items-center">
									<a href="/login"
										className="border border-transparent hover:border-gray-500 rounded-lg font-[500] p-2 ">Đăng
										nhập</a>
									<a href="/cart">
										<div className="relative flex items-center  pe-4">
										<FaOpencart size={40} />

											<span id="cart-counter"
												className="absolute block text-sm bg-yellow-700 size-5 text-center rounded-full right-0 bottom-[-8px]">
												0
											</span>
										</div>
									</a>
								</div>
							</div>
						</div>
						<div
							className="navigation w-full bg-themeColor h-14 border-neutral-600 border-t overflow-hidden "
							id="navbar">
							<div className="max-w-[1080px] h-full m-auto ">
								<Navbar></Navbar>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Header
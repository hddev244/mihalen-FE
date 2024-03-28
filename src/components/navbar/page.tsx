import type { NextPage } from "next";

const Navbar: NextPage = () => {
  return (
    <>
    <div className="h-full w-full ">
	<ul className="h-full flex justify-center space-x-4 [&>*]:rounded-lg [&>*]:block [&>*]:p-2 items-center text-sm font-[500] uppercase">
		<a className="transition ease-in-out delay-150 hover:scale-110 hover:bg-gray-600 " href="/home">
			<li>Trang chủ</li>
		</a>
		<a className="transition ease-in-out delay-150 hover:scale-110 hover:bg-gray-600  " href="/product/man">
			<li>Đồng hồ nam</li>
		</a>
		<a className="transition ease-in-out delay-150 hover:scale-110 hover:bg-gray-600  " href="/product/woman">
			<li>Đồng hồ nữ</li>
		</a>
		<a className="transition ease-in-out delay-150 hover:scale-110 hover:bg-gray-600  " href="">
			<li>Liên hệ</li>
		</a>
	</ul>
</div>
    </>
  )
}

export default Navbar
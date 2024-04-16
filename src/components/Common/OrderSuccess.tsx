import { OrderInfoSuccess } from "@/lib/object";

function OrderSuccess(
    {
        orderInfo,
        close
    }: {
        orderInfo?: OrderInfoSuccess|undefined,
        close?: () => void
    }
) {
    return (
        <>
            <div className="fixed top-0 left-0 z-[9999] flex items-center justify-center w-svw h-svh">
                <div className="absolute w-full h-full  bg-[#4d4d4d80]">

                </div>
                <div className="shadow-md bg-white shadow-gray-200 z-[9999999] rounded-lg p-6">
                    <h1 className="text-2xl text-green-500">Chúc mừng bạn đã đặt hàng thành công!</h1>
                    <h2 className="text-xl">
                        Thông tin đơn hàng:
                    </h2>
                    <p>
                        Mã đơn hàng: {orderInfo?.id}
                    </p>
                    <p>
                        Ngày đặt hàng: {orderInfo?.orderDate}
                    </p>
                    <p>
                        Tổng tiền: {orderInfo?.totalPrice}
                    </p>
                    <p>
                        Số điện thoại: {orderInfo?.phoneNumber}
                    </p>
                    <p>
                        Tên khách hàng: {orderInfo?.name}
                    </p>
                    <div className="flex justify-end">
                        <button onClick={close} className="bg-green-500 text-white px-4 py-2 rounded-md">Đóng</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderSuccess;
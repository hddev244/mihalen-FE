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
                        <b>Mã đơn hàng:</b> {orderInfo?.id}
                    </p>
                    <p>
                       <b> Ngày đặt hàng:</b> {orderInfo?.orderDate}
                    </p>
                    <p>
                        <b>Tổng tiền:</b> {orderInfo?.totalPrice}
                    </p>
                    <p>
                        <b>Tên khách hàng:</b> {orderInfo?.name}
                    </p>
                    <p>
                        <b>Số điện thoại:</b> {orderInfo?.phoneNumber}
                    </p>
                    <p>
                        <b>Địa chỉ nhận hàng:</b> {orderInfo?.address}
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
import { MessageType } from "@/lib/object";
import { Localstorage } from "@/lib/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiUser } from "react-icons/bi";
import Message from "./alert-message";



export function UserTag() {
    const [show, setShow] = useState(false);
    const router = useRouter();
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<MessageType>("success");
    const token = typeof window !== 'undefined' ? localStorage.getItem(Localstorage.TOKEN) : null;
    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            setMessage("Đăng xuất thành công");
            setMessageType("success");
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }
                , 2000);
            localStorage.removeItem(Localstorage.TOKEN);
            localStorage.removeItem(Localstorage.IS_LOGGED_IN);
            localStorage.removeItem(Localstorage.LOGGED_IN_INFO);
            setShow(false);
        }
    }
    type url = "/profile" | "/orders" | "/login";
    const handleButton = (url: url) => {
        router.push(url);
        setShow(false);
    }
    return (
        <>
            {showMessage && (<Message type={messageType} message={message} />)}
            <div className=" space-x-2 relative">
                <button onClick={() => setShow(!show)} className="text-2xl"><BiUser /></button>
                {show && (
                    <div className="absolute bottom-0 translate-y-[100%] right-0 w-48  bg-white border overflow-hidden rounded-lg shadow-md">
                        <ul className="flex flex-col">
                            <li className="hover:bg-themeColor-btn cursor-pointer hover:text-white pt-2  px-4 ">
                                <button
                                    onClick={() => handleButton("/profile")}
                                    className="block "> Thông tin cá nhân
                                </button>
                            </li>

                            <li className="hover:bg-themeColor-btn cursor-pointer hover:text-white  px-4 ">
                                <button
                                    onClick={() => handleButton("/orders")}
                                    className="block">
                                    <p>Danh sách đơn hàng</p>
                                </button>
                            </li>
                            {
                                token ? (
                                    <li className="hover:bg-themeColor-btn cursor-pointer hover:text-white pb-2 px-4 ">
                                        <button
                                            onClick={handleLogout}
                                            className="block" >
                                            Đăng xuất
                                        </button>
                                    </li>
                                ) : (
                                    <li className="hover:bg-themeColor-btn cursor-pointer hover:text-white pb-2 px-4 ">
                                        <button
                                            onClick={() => handleButton("/login")}
                                            className="block" >
                                            Đăng nhập
                                        </button>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}

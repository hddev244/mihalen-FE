import Message from "@/components/Common/alert-message";
import { Account } from "@/lib/object";
import { Localstorage } from "@/lib/store";
import { Button, Card, Checkbox, Input, Skeleton, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";

function AccountInfo(
    { username }: { username: string }
) {
    const [account, setAccount] = useState<Account>();
    const [uname, setUname] = useState(account?.username);
    const [email, setEmail] = useState(account?.email);
    const [phone, setPhone] = useState(account?.phoneNumber);
    const [fullname, setFullname] = useState(account?.fullname);
    const [address, setAddress] = useState(account?.address);
    const [token, setToken] = useState("");
    const [message, setMessage] = useState<string>();
    const [showMessage, setShowMessage] = useState(false);
    useEffect(() => {
        const storedToken = localStorage.getItem(Localstorage.TOKEN);
        if (storedToken) { // Kiểm tra nếu token tồn tại trước khi gửi yêu cầu 
            const fetchData = async () => {
                try {
                    const url = `http://localhost:8080/api/admin/account/${username}`;
                    const response = await fetch(url, {
                        method: "GET",
                        headers: {
                            "Authorization": token,
                        }
                    });
                    if (response.ok) {
                        const data: Account = await response.json()
                        setAccount(data);
                        setEmail(data.email)
                        setFullname(data.fullname)
                        setAddress(data.address)
                        setPhone(data.phoneNumber)
                    }
                } catch (error) {

                }
            }
            fetchData();
        }
    }, [])

    function handleUpdateAccount() {
        const storedToken = localStorage.getItem(Localstorage.TOKEN);
        if (storedToken) { // Kiểm tra nếu token tồn tại trước khi gửi yêu cầu 
            const fetchData = async () => {
                const dataPut = {
                    email: email,
                    phoneNumber: phone,
                    fullname: fullname,
                    address: address,
                }
                const dataJson = JSON.stringify(dataPut);
                try {
                    const url = `http://localhost:8080/api/admin/account/profile/${username}`;
                    const response = await fetch(url, {
                        method: "PUT",
                        headers: {
                            "Authorization": token,
                            "Content-Type": "application/json" // Add Content-Type header
                        },
                        body: dataJson
                    });
                    if (response.ok) {
                        setMessage("Cập nhật thành công!");
                        setShowMessage(true);
                        setTimeout(() => {
                            setShowMessage(false);
                        }, 2000);
                    } else {
                        setMessage("Cập nhật thành công!");
                        setShowMessage(true);
                        setTimeout(() => {
                            setShowMessage(false);
                        }, 2000);
                    }
                } catch (error) {
                    setMessage("Lỗi kết nối máy chủ!");
                    setShowMessage(true);
                    setTimeout(() => {
                        setShowMessage(false);
                    }, 2000);
                }
            };
            fetchData();
        }
    }
    return (
        <>
            {(account || !username)  && (<>
                {showMessage && (<Message message={message}/>)}
            <h1 className="text-3xl text-blue-600 text-center pb-4  font-semibold ">Account info</h1>
                <form className="w-3/4 flex justify-center gap-2 m-auto">
                    <div className="space-y-2 ">
                        <Input variant="bordered"
                            type="text"
                            size="lg"
                            label="Username"
                            onChange={(e) => setUname(e.target.value)}
                            value={username}
                            isRequired
                            readOnly={username ? true :false} 
                            placeholder="Enter username" />
                        <Input variant="bordered"
                            type="text" size="lg"
                            onChange={(e) => setFullname(e.target.value)}
                            value={fullname}
                            label="Fullname"
                            isRequired
                            placeholder="Enter fullname" />
                        <Input variant="bordered"
                            type="email"
                            size="lg"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            isRequired
                            label="Email"
                            placeholder="Enter email" />
                        <Input variant="bordered"
                            type="text" size="lg"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            isRequired
                            label="Phone"
                            placeholder="Enter phone number" />
                        <div className="space-x-2 p-2">
                            <span>ROLE : </span>
                            <Checkbox  isSelected={ account?.roles.some(role => role.id === 'ROLE_ADMIN') ? true: false}>AMIN</Checkbox>
                            <Checkbox isSelected={ account?.roles.some(role => role.id === 'ROLE_USER') ? true: false}>USER</Checkbox>
                            <Checkbox isSelected={ account?.roles.some(role => role.id === 'ROLE_CUSTOMER') ? true: false}>CUSTOMER</Checkbox>
                        </div>
                        <Textarea variant="bordered"
                            type="text"
                            size="lg"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                            label="address"
                            placeholder="Enter address" />
                        <div className="flex justify-center space-x-2 p-4">
                            <Button onClick={() => { handleUpdateAccount() }} color="primary" >
                                <BiSave />
                                Lưu
                            </Button>
                            <Button color="default" >
                                <BiSave />
                                Hủy
                            </Button>
                        </div>

                    </div>
                    {account && (
                        <Card className=" w-72 mx-auto space-y-5 h-80 p-4 flex justify-between " radius="lg">
                        <Skeleton className="rounded-lg">
                            <div className="h-56 rounded-lg bg-default-300"></div>
                        </Skeleton>
                        <div className="space-y-3">
                            <Skeleton className="w-3/5 rounded-lg">
                                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                        </div>
                        <label className="border px-4 py-2 bg-default-200 rounded-lg">change</label>
                        <input type="file" hidden />
                    </Card>
                    )}

                </form></>)}
        </>
    )
}

export default AccountInfo;
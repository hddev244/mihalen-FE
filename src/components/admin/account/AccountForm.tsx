import Message from "@/components/Common/alert-message";
import { Account } from "@/lib/object";
import { Localstorage } from "@/lib/store";
import { Button, Card, Checkbox, Input, Skeleton, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BiCloset, BiReset, BiSave } from "react-icons/bi";
import { BASE_API_URL } from "@/api/api-info";

function AccountInfo(
    { username }: { username?: string }
) {
    const [account, setAccount] = useState<Account>();
    const [message, setMessage] = useState<string>();
    const [showMessage, setShowMessage] = useState(false);

    // Initialize state variables with values from the account object
    const [uname, setUname] = useState(account?.username || "");
    const [email, setEmail] = useState(account?.email || "");
    const [phone, setPhone] = useState(account?.phoneNumber || "");
    const [fullname, setFullname] = useState(account?.fullname || "");
    const [address, setAddress] = useState(account?.address || "");
    const [isAdmin, setAdmin] = useState(false);
    const [isUser, setUser] = useState(false);
    const [isCustomer, setCustomer] = useState(false);
    const [errors, setErrors] = useState<any>({});

    const validateForm = () => {
        let errors: any = {};
        if (!uname) {
            errors.username = 'Username is required';
        }
        if (!phone) {
            errors.phone = 'Phone number is required';
        }
        if (!fullname) {
            errors.fullname = 'Fullname is required';
        }
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }
        return errors;
    };

    useEffect(() => {
        const storedToken = localStorage.getItem(Localstorage.TOKEN);
        if (storedToken) { // Kiểm tra nếu token tồn tại trước khi gửi yêu cầu 
            const fetchData = async () => {
                try {
                    const url = `${BASE_API_URL}/api/admin/account/${username}`;
                    const response = await fetch(url, {
                        method: "GET",
                        headers: {
                            "Authorization": storedToken,
                        }
                    });
                    if (response.ok) {
                        const data: Account = await response.json()
                        setAccount(data);
                        setEmail(data.email)
                        setFullname(data.fullname)
                        setAddress(data.address)
                        setPhone(data.phoneNumber)
                        setAdmin(data?.roles.some(role => role.id === 'ROLE_ADMIN') ? true : false)
                        setCustomer(data?.roles.some(role => role.id === 'ROLE_CUSTOMER') ? true : false)
                        setUser(data?.roles.some(role => role.id === 'ROLE_USER') ? true : false)
                    }
                } catch (error) {

                }
            }
            fetchData();
        }
    }, [username])

    function handleUpdateAccount() {
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            const storedToken = localStorage.getItem(Localstorage.TOKEN);
            if (storedToken) { // Kiểm tra nếu token tồn tại trước khi gửi yêu cầu 
                const fetchData = async () => {
                    account
                    const dataPut = {
                        email: email,
                        phoneNumber: phone,
                        fullname: fullname,
                        address: address,
                    }
                    const dataJson = JSON.stringify(dataPut);
                    try {
                        const url = `${BASE_API_URL}/api/admin/account/profile/${username}`;
                        const response = await fetch(url, {
                            method: "PUT",
                            headers: {
                                "Authorization": storedToken,
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
        } else {
            // Form is invalid, set errors state to display error messages
            setErrors(errors);
        }
    }

    const handleCreateAccount = () => {
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            const storedToken = localStorage.getItem(Localstorage.TOKEN);
            if (storedToken) { // Kiểm tra nếu token tồn tại trước khi gửi yêu cầu 
                const fetchData = async () => {
                    const roles = [];
                    if (isAdmin) roles.push({ id: 'ROLE_ADMIN' })
                    if (isCustomer) roles.push({ id: 'ROLE_CUSTOMER' })
                    if (isUser) roles.push({ id: 'ROLE_USER' })
                    const dataPut = {
                        username: uname,
                        fullname: fullname,
                        email: email,
                        phoneNumber: phone,
                        address: address,
                        roles: roles
                    }
                    const dataJson = JSON.stringify(dataPut);
                    try {
                        const url = `${BASE_API_URL}/api/admin/account`;
                        const response = await fetch(url, {
                            method: "POST",
                            headers: {
                                "Authorization": storedToken,
                                "Content-Type": "application/json" // Add Content-Type header
                            },
                            body: dataJson
                        });
                        const rp = await response.json();

                        if (response.ok) {
                            setShowMessage(true);
                            setTimeout(() => {
                                setShowMessage(false);
                            }, 2000);
                        } else {
                            setShowMessage(true);
                            setTimeout(() => {
                                setShowMessage(false);
                            }, 2000);
                        }
                        setMessage(rp.message);

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
        } else {
            // Form is invalid, set errors state to display error messages
            setErrors(errors);
        }
    }

    const resetForm = () => {
        setEmail("")
        setFullname("")
        setAddress("")
        setPhone("")
        setAdmin(false)
        setCustomer(false)
        setUser(false)
    }


    return (
        <>
            {(account || !username) && (<>
                {showMessage && (<Message message={message} />)}
                <h1 className="text-3xl text-blue-600 text-center pb-4  font-semibold ">Account info</h1>
                <form className="w-3/4 flex justify-center gap-2 m-auto">
                    <div className="space-y-2 ">
                        <Input variant="bordered"
                            type="text"
                            size="lg"
                            label="Username"
                            onChange={(e) => setUname(e.target.value)}
                            value={uname}
                            isRequired
                            errorMessage={errors.username}
                            readOnly={username ? true : false}
                            placeholder="Enter username" />
                        <Input variant="bordered"
                            type="text" size="lg"
                            onChange={(e) => setFullname(e.target.value)}
                            value={fullname}
                            label="Fullname"
                            isRequired
                            errorMessage={errors.fullname}
                            placeholder="Enter fullname" />
                        <Input variant="bordered"
                            type="email"
                            size="lg"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            isRequired
                            label="Email"
                            errorMessage={errors.email}
                            placeholder="Enter email" />
                        <Input variant="bordered"
                            type="text" size="lg"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            isRequired
                            label="Phone"
                            errorMessage={errors.phone}
                            placeholder="Enter phone number" />
                        <div className="space-x-2 p-2">
                            <span>ROLE : </span>
                            <Checkbox onChange={() => { setAdmin(!isAdmin) }} isSelected={isAdmin}>AMIN</Checkbox>
                            <Checkbox onChange={() => { setUser(!isUser) }} isSelected={isUser}>USER</Checkbox>
                            <Checkbox onChange={() => { setCustomer(!isCustomer) }} isSelected={isCustomer}>CUSTOMER</Checkbox>
                        </div>
                        <Textarea variant="bordered"
                            type="text"
                            size="lg"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                            label="address"
                            placeholder="Enter address" />
                        <div className="flex justify-center space-x-2 p-4">
                            {
                                !username ? (
                                    <>
                                        <Button onClick={() => { handleCreateAccount() }} color="primary" >
                                            <BiSave />
                                            Create
                                        </Button>
                                        <Button onClick={() => resetForm()} color="default" >
                                            <BiReset />
                                            Clear
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button onClick={() => { handleUpdateAccount() }} color="primary" >
                                            <BiSave />
                                            Lưu
                                        </Button>
                                        <Button color="default" >
                                            <BiCloset />
                                            Hủy
                                        </Button>
                                    </>
                                )
                            }

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
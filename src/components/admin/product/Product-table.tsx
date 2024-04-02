import { Account } from "@/lib/object";
import { Localstorage } from "@/lib/store";
import { Button, Card, CircularProgress, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaLock, FaLockOpen } from "react-icons/fa";
import Message from "@/components/Common/alert-message";
import { BASE_API_URL } from "../../../server/api";

function ProductTable() {
    const [accounts, setAccounts] = useState<Account[]>();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [totalPages, setTotalPages] = useState(0);
    const [isEditting, setEditting] = useState(false);
    const [accountEditting, setAccountEditting] = useState("");
    const [checkDelete, setCheckDelete] = useState(true)
    const [token, setToken] = useState("");
    const [message, setMessage] = useState<string>();
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem(Localstorage.TOKEN);
            if (storedToken) { // Kiểm tra nếu token tồn tại trước khi gửi yêu cầu 
                const fetchData = async () => {
                    try {
                        const url = `${BASE_API_URL}/api/admin/accounts/pages?index=${currentPage - 1}&size=${pageSize}`;
                        setToken(`Bearer ${storedToken}`);
                        const response = await fetch(url, {
                            method: "GET",
                            headers: {
                                "Authorization": token,
                            }
                        });
                        const responseData = await response.json();
                        const accs: Account[] = await responseData.content;
                        setTotalPages(responseData.totalPages);
                        setAccounts(accs);
                    } catch (error) {
                        console.log(error);
                    }
                };
                fetchData();
            }
        }
    }, [currentPage, pageSize, checkDelete]);

    const handleEdit = (username: string) => {
        setAccountEditting(username)
        setEditting(true);
    }

    const handleLockedAccount = (id: number, isLocked: boolean) => {
        const fetchData = async () => {
            try {
                const url = `${BASE_API_URL}/api/admin/account/lock/${id}`;
                console.log(token)
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Authorization": token,
                    }
                });
                setCheckDelete(!checkDelete);
                if (response.ok) {
                    setMessage(isLocked ? "Mở khóa tài khoản thành công!" : "Khóa tài khoản thành công!");
                    setShowMessage(true);
                    setTimeout(() => {
                        setShowMessage(false);
                    }, 2000);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }

    return accounts ? (
        <>
            <Card className="flex size-full flex-col items-center p-4">
                {isEditting ?
                    (<>
                        <div className="w-full">
                            <Button className="m-8" onClick={() => { setEditting(false) }} > Back</Button>
                        </div>
                    </>) : (
                        <>
                            {showMessage && (<Message message={message} />)}
                            <Table color="secondary"
                                aria-label="Account table"
                                selectionMode="single"
                                defaultSelectedKeys={["2"]
                                }
                            >
                                <TableHeader>
                                    <TableColumn>NAME</TableColumn>
                                    <TableColumn>FULLNAME</TableColumn>
                                    <TableColumn>EMAIL</TableColumn>
                                    <TableColumn>ROLE</TableColumn>
                                    <TableColumn>STATUS</TableColumn>
                                    <TableColumn> ACTION </TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {//rander row of account
                                        accounts.map((data) => {
                                            return (
                                                <TableRow key={data.id}>
                                                    <TableCell>{data.username}</TableCell>
                                                    <TableCell>{data.fullname}</TableCell>
                                                    <TableCell>{data.email}</TableCell>
                                                    <TableCell>CEO</TableCell>
                                                    <TableCell>{data.locked ? "Locked" : "Active"}</TableCell>
                                                    <TableCell> <div className="relative flex items-center gap-2">
                                                        <Tooltip content="Details">
                                                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                                <FaEye />
                                                            </span>
                                                        </Tooltip>
                                                        <Tooltip content="Edit user">
                                                            <span onClick={() => { handleEdit(data.username) }} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                                <FaEdit />
                                                            </span>
                                                        </Tooltip>
                                                        <Tooltip color="primary" content={data.locked ? "unlock account" : "lock account"}>
                                                            {data.locked ? (<span onClick={() => handleLockedAccount(data.id, data.locked)} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                                <FaLock />
                                                            </span>)
                                                                :
                                                                (<span onClick={() => handleLockedAccount(data.id, data.locked)} className="text-lg text-primary-500 cursor-pointer active:opacity-50">
                                                                    <FaLockOpen />
                                                                </span>
                                                                )}
                                                        </Tooltip>
                                                    </div></TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                            <div className="flex flex-col gap-5 p-4">
                                <Pagination
                                    total={totalPages}
                                    color="secondary"
                                    page={currentPage}
                                    onChange={setCurrentPage} />
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="flat"
                                        color="secondary"
                                        onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="flat"
                                        color="secondary"
                                        onPress={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </>)}
            </Card>

        </>
    ) : (<>
        {/* <div className="size-full flex items-center justify-center"> */}
        <CircularProgress className="size-full m-auto " size="lg" aria-label="Loading..." />
        {/* </div> */}
    </>);
}

export default ProductTable
import { Account, MessageType } from "@/lib/object";
import { Localstorage } from "@/lib/store";
import { Button, Card, Checkbox, CircularProgress, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Message from "@/components/Common/alert-message";
import { BASE_API_URL } from "../../../api/api-info";

function RolesTable() {
    const [accounts, setAccounts] = useState<Account[]>();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [checkChangeRole, setCheckChangeRole] = useState(true)
    const [message, setMessage] = useState<string>();
    const [showMessage, setShowMessage] = useState(false);
    const [messageType, setMessageType] = useState<MessageType>("success");

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem(Localstorage.TOKEN);
            if (storedToken) { // Kiểm tra nếu token tồn tại trước khi gửi yêu cầu 
                console.log(storedToken)
                const fetchData = async () => {
                    try {
                        const url = `${BASE_API_URL}/api/admin/accounts/pages?index=${currentPage - 1}&size=${pageSize}`;
                        const response = await fetch(url, {
                            method: "GET",
                            headers: {
                                "authorization": storedToken,
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
    }, [currentPage, pageSize]);

    const handleChangeRole = (username: string, roleId: string) => {
        const storedToken = localStorage.getItem(Localstorage.TOKEN);
        if (storedToken) {
            const fetchData = async () => {
                const dataPost = {
                    roleId: roleId,
                    username: username,
                }
                try {
                    const url = `${BASE_API_URL}/api/admin/account/roles`;
                    const response = await fetch(url, {
                        method: "POST",
                        headers: {
                            "Authorization": storedToken,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(dataPost)
                    });
                    const data = await response.json();
                    setCheckChangeRole(!checkChangeRole);
                    setMessage(data.message);
                    if (response.ok) {
                        setShowMessage(true);
                        setMessageType("success");
                    }
                } catch (error) {
                    setMessage("Change role failed");
                    setMessageType("error");
                    setShowMessage(true);
                    console.log(error);
                }
                setTimeout(() => {
                    setShowMessage(false);
                }, 2000);
            };
            fetchData();
        }
    }
    return accounts ? (
        <>
            <Card className="flex size-full flex-col items-center p-4">
                {showMessage && (<Message message={message} type={messageType} />)}
                <Table color="secondary"
                    aria-label="Account table"
                    selectionMode="single"
                    defaultSelectedKeys={["2"]
                    }
                >
                    <TableHeader>
                        <TableColumn>USENAME</TableColumn>
                        <TableColumn>Fullname</TableColumn>
                        <TableColumn>EMAIL</TableColumn>
                        <TableColumn>ADMIN</TableColumn>
                        <TableColumn>USER</TableColumn>
                        <TableColumn>CUSTOMER</TableColumn>
                        <TableColumn>STATUS</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {//rander row of account
                         accounts && accounts.map((data) => {
                                return (
                                    <TableRow key={data.id}>
                                        <TableCell>{data.username}</TableCell>
                                        <TableCell>{data.fullname}</TableCell>
                                        <TableCell>{data.email}</TableCell>
                                        <TableCell>
                                            <input type="checkbox" onChange={() => { handleChangeRole(data.username, 'ROLE_ADMIN') }} checked={data.roles.some(role => role.id === 'ROLE_ADMIN') ? true : false} />
                                        </TableCell>
                                        <TableCell>
                                        <input type="checkbox" onChange={() => { handleChangeRole(data.username, 'ROLE_USER') }} checked={data.roles.some(role => role.id === 'ROLE_USER') ? true : false}/>
                                        </TableCell>
                                        <TableCell>
                                        <input type="checkbox"   onChange={() => { handleChangeRole(data.username, 'ROLE_CUSTOMER') }} checked={data.roles.some(role => role.id === 'ROLE_CUSTOMER') ? true : false}/>
                                        </TableCell>
                                        <TableCell>{data.locked ? "Locked" : "Active"}</TableCell>
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
            </Card>
        </>
    ) : (<>
        {/* <div className="size-full flex items-center justify-center"> */}
        <CircularProgress className="size-full m-auto " size="lg" aria-label="Loading..." />
        {/* </div> */}
    </>);
}

export default RolesTable
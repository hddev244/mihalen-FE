import Message from "@/components/Common/alert-message";
import { Category } from "@/lib/object";
import { Localstorage } from "@/lib/store";
import { BASE_API_URL } from "@/server/api";
import { Button, Card, CircularProgress, Input, Select, SelectItem, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { BiReset, BiSave } from "react-icons/bi";
import { FaEdit, FaEye } from "react-icons/fa";

function CategoryForm() {
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [errors, setErrors] = useState<any>({});
    const [message, setMessage] = useState<string>();
    const [showMessage, setShowMessage] = useState(false);


    const [categories, setCategories] = useState<Category[]>();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [totalPages, setTotalPages] = useState(0);
    const [checkDelete, setCheckDelete] = useState(true)
    const [token, setToken] = useState("");


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem(Localstorage.TOKEN);
            if (storedToken) { // Kiểm tra nếu token tồn tại trước khi gửi yêu cầu 
                const fetchData = async () => {
                    try {
                        const url = `${BASE_API_URL}/api/admin/category/pages?index=${currentPage - 1}&size=${pageSize}`;
                        setToken(`Bearer ${storedToken}`);
                        const response = await fetch(url, {
                            method: "GET",
                            headers: {
                                "Authorization": token,
                            }
                        });
                        const responseData = await response.json();
                        const categoriesContent = await responseData.data.content;
                        setTotalPages(responseData.data.totalPages);
                        setCategories(categoriesContent);
                    } catch (error) {
                        console.log(error);
                    }
                };
                fetchData();
            }
        }
    }, [currentPage, pageSize, checkDelete]);


    const validateForm = () => {
        let errors: any = {};
        if (!id) {
            errors.id = 'ID is required';
        }
        if (!name) {
            errors.name = 'Name is required';
        }
        return errors;
    };


    const handleCreate = () => {
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            const storedToken = localStorage.getItem(Localstorage.TOKEN);
            if (storedToken) { // Kiểm tra nếu token tồn tại trước khi gửi yêu cầu 
                const fetchData = async () => {
                    const dataPost = {
                        id: id,
                        name: name,
                    }
                    const dataJson = JSON.stringify(dataPost);
                    try {
                        const url = `${BASE_API_URL}/api/admin/category`;
                        const response = await fetch(url, {
                            method: "POST",
                            headers: {
                                "Authorization": storedToken,
                                "Content-Type": "application/json" // Add Content-Type header
                            },
                            body: dataJson
                        });

                        const resJson = await response.json();
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
                        setMessage(resJson.message);

                    } catch (error) {
                        console.log(error)
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
    };
    return (
        <>
            {showMessage && (<Message message={message} />)}
            <h1 className="text-center text-3xl p-4 text-primary-500 font-semibold">Category</h1>
            <form className="w-1/2  justify-center gap-2 m-auto">
                <div className="space-y-2 ">
                    <Input variant="bordered"
                        type="text" size="lg"
                        onChange={(e) => setId(e.target.value)}
                        value={id}
                        isRequired
                        label="Category ID"
                        errorMessage={errors.id}
                        placeholder="Enter product name" />
                    <Input variant="bordered"
                        type="text" size="lg"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        isRequired
                        label="Category name"
                        errorMessage={errors.name}
                        placeholder="Enter name" />

                    <div className="flex justify-center space-x-2 p-4 ">
                        <Button onClick={() => { handleCreate(); }} color="secondary">
                            <BiSave />
                            Create
                        </Button>
                        <Button onClick={() => { handleCreate(); }} color="success">
                            <BiSave />
                            Update
                        </Button>
                        <Button onClick={() => resetForm()} color="default">
                            <BiReset />
                            Clear
                        </Button>
                    </div>
                    <hr />
                </div>
            </form>
            {/* {showMessage && (<Message message={message} />)} */}
            {categories ? (<>
                <Table color="secondary"
                    aria-label="Account table"
                    selectionMode="single"
                    defaultSelectedKeys={["2"]
                    }
                >
                    <TableHeader>
                        <TableColumn>ID</TableColumn>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn> ACTION </TableColumn>
                    </TableHeader>
                    <TableBody>
                        {//rander row of account
                            categories.map((category) => {
                                return (
                                    <TableRow key={category.id}>
                                        <TableCell>{category.id}</TableCell>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell> <div className="relative flex items-center gap-2">
                                            <Tooltip content="Details">
                                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <FaEye />
                                                </span>
                                            </Tooltip>
                                            {/* <Tooltip content="Edit user">
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
                                    </Tooltip> */}
                                        </div></TableCell>
                                    </TableRow>
                                );
                            })}

                    </TableBody>
                </Table>
            </>) : (<>
                {/* <div className="size-full flex items-center justify-center"> */}
                <CircularProgress className="size-full m-auto " size="lg" aria-label="Loading..." />
                {/* </div> */}
            </>)}
        </>
    );
}

export default CategoryForm
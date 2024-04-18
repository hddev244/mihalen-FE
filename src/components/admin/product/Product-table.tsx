import { Account, Product } from "@/lib/object";
import { Localstorage } from "@/lib/store";
import { Button, Card, CircularProgress, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaLock, FaLockOpen } from "react-icons/fa";
import Message from "@/components/Common/alert-message";
import { BASE_API_URL } from "../../../api/api-info";
import { FaDeleteLeft } from "react-icons/fa6";
import ProductEdit from "./product-edit/ProductEdit";
import { getImage } from "@/lib/imageUtil";
import Image from "next/image";

function ProductTable() {
    const [products, setProducts] = useState<Product[]>();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(1000);
    const [totalPages, setTotalPages] = useState(0);
    const [accountEditting, setAccountEditting] = useState("");
    const [checkDelete, setCheckDelete] = useState(true)
    const [message, setMessage] = useState<string>();
    const [showMessage, setShowMessage] = useState(false);
    const [product, setProduct] = useState<Product>();
    
    const [isEditting, setEditting] = useState(false);
    const [productEditting, setProductEditting] = useState<Product>({
        id: 0,
        name: "",
        price: 0,
        createDate: "",
        modifiDate: "",
        category: { id: "", name: "" }, 
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem(Localstorage.TOKEN);
            if (storedToken) {
                const fetchData = async (retry = 3) => {
                    try {
                        const url = `${BASE_API_URL}/api/product/pages?index=${currentPage - 1}&size=${pageSize}`;
                        const response = await fetch(url, {
                            method: "GET",
                            headers: {
                                "Authorization": storedToken,
                            }
                        });
                        if (response.ok) {
                            const responseData = await response.json();
                            setProducts(responseData.data.content);
                            setTotalPages(responseData.totalPages);
                            console.log(responseData.data.content);
                        } else {
                            // console.log("error");
                            // if (retry > 0) {
                            //     setTimeout(() => fetchData(retry - 1), 3000); // Retry after 3 seconds
                            // } else {
                            //     setMessage("Error when fetching data");
                            //     setShowMessage(true);
                            //     setTimeout(() => {
                            //         setShowMessage(false);
                            //     }, 2000);
                            // }
                        }
                    } catch (error) {
                        console.log(error);
                        if (retry > 0) {
                            setTimeout(() => fetchData(retry - 1), 3000); // Retry after 3 seconds
                        } else {
                            setMessage("Error when fetching data");
                            setShowMessage(true);
                            setTimeout(() => {
                                setShowMessage(false);
                            }, 2000);
                        }
                    }
                };
                fetchData();
            }
        }
    }, [currentPage, pageSize, checkDelete]);

    const handleEdit = (product: Product) => {
        setProductEditting(product);
        setEditting(true);
    }

    const handleDelete = async (id: number) => {
        const url = `${BASE_API_URL}/api/product/${id}`;
        const token = localStorage.getItem(Localstorage.TOKEN);
        if(!token) return;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Authorization": token,
                }
            });
            if (response.ok) {
                setCheckDelete((prev) => !prev);
                setMessage("Delete success");
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 2000);
            } else {
                setMessage("Delete fail");
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 2000);
            }
        } catch (error) {
            console.log(error);
            setMessage("Delete fail");
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 2000);
        }
    }
    const formatDate = (date: Date | null | undefined | string) => {
        if (!date || undefined) return "";
        const formattedDate = new Date(date).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        return formattedDate.replace(',', '/');
    }

    return products ? (
        <>
            {showMessage && (<Message message={message} />)}
            {<Card className="flex size-full flex-col items-center p-4">
                {isEditting ?
                    (<>
                        <div className="w-full">
                            <Button className="m-8" onClick={() => { setEditting(false) }} > Back</Button>
                            <ProductEdit data={productEditting} />
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
                                    <TableColumn>ID</TableColumn>
                                    <TableColumn>NAME</TableColumn>
                                    <TableColumn>Price</TableColumn>
                                    <TableColumn>ROLE</TableColumn>
                                    <TableColumn>STATUS</TableColumn>
                                    <TableColumn>image</TableColumn>
                                    <TableColumn> ACTION </TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {//rander row of account
                                        products.map((product) => {
                                            return (
                                                <TableRow key={product.id}>
                                                    <TableCell>{product.id}</TableCell>
                                                    <TableCell>{product.name}</TableCell>
                                                    <TableCell>{product.price}</TableCell>
                                                    <TableCell>{formatDate(product.createDate) || ""}</TableCell>
                                                    <TableCell>{formatDate(product.modifiDate) || ""}</TableCell>
                                                    <TableCell>
                                                        {product.thumbnail && <Image 
                                                                            src={product.thumbnail.id?getImage(product.thumbnail.id):""}
                                                                            alt={product.name}
                                                                            style={{ width: "70px", height: "70px" }}
                                                        />}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="relative flex items-center gap-2">
                                                            <Tooltip content="Details">
                                                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                                    <FaEye />
                                                                </span>
                                                            </Tooltip>
                                                            <Tooltip content="Edit user">
                                                                <span onClick={() => { handleEdit(product) }} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                                    <FaEdit />
                                                                </span>
                                                            </Tooltip>
                                                            <Tooltip color="primary" >
                                                                <span onClick={() => { handleDelete(product.id ?? 0) }} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                                    <FaDeleteLeft />
                                                                </span>
                                                            </Tooltip>
                                                        </div>
                                                    </TableCell>
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
            </Card>}

        </>
    ) : (<>
        {/* <div className="size-full flex items-center justify-center"> */}
        <CircularProgress className="size-full m-auto " size="lg" aria-label="Loading..." />
        {/* </div> */}
    </>);
}

export default ProductTable
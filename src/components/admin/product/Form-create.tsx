import Message from "@/components/Common/alert-message";
import { Category, MessageType, Product } from "@/lib/object";
import { Localstorage } from "@/lib/store";
import { BASE_API_URL } from "@/api/api-info";
import { Button, Card, Checkbox, Input, Select, SelectItem, Skeleton, Textarea } from "@nextui-org/react";
import type { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import { BiReset, BiSave } from "react-icons/bi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { RiImageAddFill } from "react-icons/ri";


function FormCreateProduct() {
    const [product, setProduct] = useState<Product>({
        name: "",
        price: 0,
        description: "",
        category: { id: "", name: ""},
    });
    const [categories, setCategories] = useState<Category[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [token, setToken] = useState("");
    const [messageType, setMessageType] = useState<MessageType>("success");

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const t = localStorage.getItem(Localstorage.TOKEN);
            if (t) { // Kiểm tra nếu token tồn tại trước khi gửi yêu cầu 
                setToken(t);
                const fetchData = async () => {
                    try {
                        const url = `${BASE_API_URL}/api/admin/categories`;
                        const response = await fetch(url, {
                            method: "GET",
                            headers: {
                                "Authorization": t,
                            }
                        });
                        const responseData = await response.json();
                        setCategories(responseData.data);
                        console.log(responseData);
                    } catch (error) {
                        console.log(error);
                    }
                };
                fetchData();
            }
        }
    }, []);

    const handleCreate = () => {
      
        if(product.name === "" || product.price === 0 || product.description === "" || product.category.id === ""){ 
            setMessage("Please fill in all fields");
            setMessageType("error");
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 2000);
            return;
        }
        const productData = {
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
        }

        const formData = new FormData();
        formData.append("product", JSON.stringify(productData));
        for (let i = 0; i < files.length; i++) {
            formData.append("imageFile", files[i]);
        }
        
        let data = new FormData();
        const fetchData = async () => {
            try {
                const fetchUrl = `${BASE_API_URL}/api/product`;
                const response = await fetch(fetchUrl, {
                    method: "POST",
                    headers: {
                        Authorization: token ,
                        
                    },
                    body: formData,
                });
                if (response.ok) {
                    const responseData = await response.json();
                    setShowMessage(true);
                    setMessage("Create product success");
                    setMessageType("success");
                    resetForm();
                    setFiles([]);
                } else {
                    setShowMessage(true);
                    setMessage("Create product failed");
                    setMessageType("error");
                }
            } catch (error) {
                console.log(error);
                setShowMessage(true);
                setMessage("Create product failed");
                setMessageType("error");
            }
            setTimeout(() => {
                setShowMessage(false);
            }, 2000);
        }
        fetchData();
    };

    const validateForm = (): { name?: string; price?: string; description?: string; category?: string } => {
        const errors: { name?: string; price?: string; description?: string; category?: string } = {};
        if (!product.name) {
            errors.name = "Name is required";
        }
        if (!product.price) {
            errors.price = "Price is required";
        }
        if (!product.description) {
            errors.description = "Description is required";
        }
        if (!product.category) {
            errors.category = "Category is required";
        }
        return errors;
    };

    const resetForm = () => {
        setProduct({
            name: "",
            price: 0,
            description: "",
            category: { id: "", name: "" },
        });
    };
    function changeFile(e: ChangeEvent<HTMLInputElement>) {
        const newFiles = Array.from(e.target.files || []);
        if (newFiles) {
            console.log([...newFiles]);
            setFiles([...files,...newFiles]);
        }

    }

    function handleChangeCategory(e: ChangeEvent<HTMLSelectElement>) {
        const category = categories.find((category) => category.id === e.target.value);
        if (category) {
            setProduct({ ...product, category: category });
        }
    }

    return (
        <>  {showMessage && <Message message={message} type={messageType} ></Message>}
            <h1 className="text-center text-3xl p-4 text-primary-500 font-semibold">Create Product</h1>
            <form className="w-3/4 grid grid-cols-2 justify-center gap-2 m-auto">
                <div className="space-y-2 ">
                    <Input variant="bordered"
                        type="text" size="lg"
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        value={product.name}
                        isRequired
                        label="Product name"
                        errorMessage={validateForm().name}
                        placeholder="Enter product name" />
                    <Input variant="bordered"
                        type="text" size="lg"
                        onChange={(e) => setProduct({ ...product, price: parseInt(e.target.value) || 0})}
                        value={product.price.toString()} // Convert the number to a string
                        isRequired
                        label="Price"
                        errorMessage={validateForm().price}
                        placeholder="Enter price" />
                    <Select
                        onChange={(e) => {handleChangeCategory(e);}}
                        variant="bordered"
                        color="default"
                        label="Category"
                        placeholder="Select Category"
                        errorMessage={validateForm().category}
                    >
                        {categories.map((category) => (
                            <SelectItem 
                                key={category.id} value={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </Select>
                    
                    <Textarea variant="bordered"
                        type="text"
                        size="lg"
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        value={product.description}
                        label="description"
                        placeholder="description" />

                    <div className="flex justify-center space-x-2 p-4">
                        <Button onClick={() => { handleCreate(); }} color="primary">
                            <BiSave />
                            Create
                        </Button>
                        <Button onClick={() => resetForm()} color="default">
                            <BiReset />
                            Clear
                        </Button>
                    </div>
                </div>
                <div className='grid grid-cols-4 gap-2 p-4'>
                   {files && files.map((file, index) => (
                         <div className='aspect-square border bg-slate-200 relative'>
                            <img src={URL.createObjectURL(file)} alt='image' className='w-full h-full object-cover' />
                         <button
                            type='button'
                            onClick={() => {
                                const newFiles = files.filter((f, i) => i !== index);
                                setFiles(newFiles);
                            }}
                            className='absolute right-2 top-2'><IoCloseCircleOutline /></button>
                     </div>
                     ))}
                    <div className='aspect-square border text-7xl text-gray-600 flex items-center justify-center'>
                    <input 
                        multiple
                        onChange={(e) => {changeFile(e)}} 
                        accept="image/*"
                        type='file' id='imagesPro' 
                        className='hidden' />
                    <label className='hover:cursor-pointer ' htmlFor="imagesPro"><RiImageAddFill /></label>
                    </div>
                </div>
            </form>
        </>
    );
}

export default FormCreateProduct
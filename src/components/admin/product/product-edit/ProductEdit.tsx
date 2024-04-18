import Message from '@/components/Common/alert-message';
import { getImage } from '@/lib/imageUtil';
import { Category, Image as IMG, MessageType, Product } from '@/lib/object';
import { Localstorage } from '@/lib/store';
import { BASE_API_URL } from '@/api/api-info';
import { Button, Card, Input, Select, SelectItem, Skeleton, Textarea } from '@nextui-org/react';
import React, { ChangeEvent, use, useEffect, useState } from 'react';
import { BiReset, BiSave } from 'react-icons/bi';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { RiImageAddFill } from 'react-icons/ri';
import Image from 'next/image';

function ProductEdit(
    { data }: { data: Product }
) {
    const [product, setProduct] = useState<Product>(data);
    const [categories, setCategories] = useState<Category[]>([]);
    // const [file, setFile] = useState<File | null>(null);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<MessageType>("success");
    const [images, setImages] = useState<IMG[]>(data.images || []);

    // Get categories
    useEffect(() => {
        const token = localStorage.getItem(Localstorage.TOKEN);
        if (!token) {
            return;
        }
        const fetchData = async () => {
            try {
                const fetchUrl = `${BASE_API_URL}/api/admin/categories`;
                const response = await fetch(fetchUrl, {
                    method: "GET",
                    headers: {
                        "Authorization": token,
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
    }, []);

    useEffect(() => {
        const token = localStorage.getItem(Localstorage.TOKEN);
        if (!token) {
            return;
        }
        const fetchData = async () => {
            try {
                const fetchUrl = `${BASE_API_URL}/api/product/findById/${product.id}`;
                const response = await fetch(fetchUrl, {
                    method: "GET",
                    headers: {
                        "Authorization": token,
                    }
                });
                const responseData = await response.json();
                if (response.ok) {
                    setProduct(responseData.data);
                    setImages(responseData.data.images);
                }
            } catch (error) {
                setMessage("Get product failed");
                setMessageType("error");
                setShowMessage(true);
               
                console.log(error);
            }
            setTimeout(() => {
                setShowMessage(false);
            }, 2000);
        };
        fetchData();
    },[product.id]);

    // validate form
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
    //  Update product
    const handleUpdate = () => {
        const token = localStorage.getItem(Localstorage.TOKEN);
        console.log(token);
        if (token) {
            console.log(product);
            if (product.name === "" || product.price === 0 || product.description === "" || product.category?.id === "") {
                setMessage("Please fill in all fields");
                setMessageType("error");
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 2000);
                return;
            }
            const dataPayload = product
            console.log(dataPayload);
            let data = new FormData();
            const fetchData = async () => {
                try {
                    const fetchUrl = `${BASE_API_URL}/api/product/${product.id}`;
                    const response = await fetch(fetchUrl, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: token,
                        },
                        body: JSON.stringify(dataPayload),
                    });
                    if (response.ok) {
                        const responseData = await response.json();
                        console.log(responseData);
                        setShowMessage(true);
                        setMessage("Create product success");
                        setMessageType("success");
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
        }
    };

    //select category 
    const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const category = categories.find((cate) => cate.id === e.target.value) as Category;
        setProduct({ ...product, category: category });
    }

    const handleRemoveImage = (imageId: number, index: number) => {
        const token = localStorage.getItem(Localstorage.TOKEN);
        if (token) {
            const fetchData = async () => {
                let data = new FormData();
                data.append("imageId", imageId.toString());
                data.append("productId", product.id?.toString() || "");
                try {
                    const fetchUrl = `${BASE_API_URL}/api/product/removeImage`;
                    const response = await fetch(fetchUrl, {
                        method: "POST",
                        headers: {
                            Authorization: token,
                        },
                        body: data,
                    });
                    if (response.ok) {
                        const responseData = await response.json();
                        console.log(responseData);
                        setShowMessage(true);
                        setMessage("Delete image success");
                        setMessageType("success");
                        const newImages = images.filter((f, i) => i !== index);
                        setImages(newImages);
                    } else {
                        setShowMessage(true);
                        setMessage("Delete image failed");
                        setMessageType("error");
                    }
                } catch (error) {
                    console.log(error);
                    setShowMessage(true);
                    setMessage("Delete image failed");
                    setMessageType("error");
                }
                setTimeout(() => {
                    setShowMessage(false);
                }, 2000);
            }
            fetchData();
        }
    }

    // Change file
    function changeFile(e: ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files || []);
        const token = localStorage.getItem(Localstorage.TOKEN);
        if (!token) {
            return;
        }
        if (files !== null && files.length > 0) {
            const fetchData = async () => {
                try {
                    const fetchUrl = `${BASE_API_URL}/api/product/updateImages`;
                    const formData = new FormData();
                    formData.append("productId", product.id?.toString() || "");
                    files.forEach((file) => {
                        formData.append("imageFile", file);
                    });
                    const response = await fetch(fetchUrl, {
                        method: "PUT",
                        headers: {
                            Authorization: token,
                        },
                        body: formData,
                    });
                    if (response.ok) {
                        const responseData = await response.json();
                        console.log(responseData);
                        const newImages = [...responseData.data.images];
                        setImages(newImages);
                        setShowMessage(true);
                        setMessage("Upload image success");
                        setMessageType("success");
                    }
                } catch (error) {
                    console.log(error);
                    setShowMessage(true);
                    setMessage("Upload image failed");
                    setMessageType("error");
                }
                setTimeout(() => {
                    setShowMessage(false);
                }
                    , 2000);
            }
            fetchData();
        }
    }
    return (
        <div>
            <h1>{product?.name}</h1>
            <h1>{product.category?.id}</h1>
            {showMessage && <Message type={messageType} message={message} />}
            <form className="w-3/4 grid grid-cols-2 justify-center gap-2 m-auto">
                <div className="space-y-2 ">
                    <Input variant="bordered"
                        type="text" size="lg"
                        value={product.id?.toString()} // Convert the number to a string
                        isRequired
                        label="Product id"
                    />
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
                        onChange={(e) => setProduct({ ...product, price: parseInt(e.target.value) || 0 })}
                        value={product.price.toString()} // Convert the number to a string
                        isRequired
                        label="Price"
                        errorMessage={validateForm().price}
                        placeholder="Enter price" />
                    <Select
                        onChange={(e) => { handleChangeCategory(e); }}
                        variant="bordered"
                        color="default"
                        label="Category"
                        placeholder="Select Category"
                        errorMessage={validateForm().category}
                        defaultSelectedKeys={[product.category.id]}
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
                        <Button onClick={() => { handleUpdate(); }} color="primary">
                            <BiSave />
                            Update
                        </Button>
                    </div>
                </div>
                <div className='grid grid-cols-4 grid-rows-4 gap-2 p-4'>
                    {images && images.map((image, index) => (
                        <div key={image.id} className='aspect-square border relative'>
                            {image && <Image src={getImage(image.id)} alt='image' className='w-full h-full object-cover' />}
                            <button
                                type='button'
                                title='Remove image'
                                onClick={() => {
                                    handleRemoveImage(image.id, index);
                                }}
                                className='absolute bg-white rounded-full z-50 right-2 top-2'><IoCloseCircleOutline /></button>
                        </div>
                    ))}
                    <div className='aspect-square border text-7xl text-gray-600 flex items-center justify-center'>
                        <input
                            multiple
                            onChange={(e) => { changeFile(e) }}
                            accept="image/*"
                            type='file' id='imagesPro'
                            className='hidden' />
                        <label
                            title='Add image'
                            className='hover:cursor-pointer '
                            htmlFor="imagesPro"><RiImageAddFill />
                        </label>
                    </div>
                </div>
            </form >
        </div >
    );
}

export default ProductEdit;
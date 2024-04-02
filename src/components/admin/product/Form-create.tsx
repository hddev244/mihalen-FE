import { Button, Card, Checkbox, Input, Select, SelectItem, Skeleton, Textarea } from "@nextui-org/react";
import type { NextPage } from "next";
import { BiReset, BiSave } from "react-icons/bi";

function FormCreateProduct() {
    const handleCreate = () => {
    };
    const resetForm = () => {
    };
    return (
        <>
            <h1 className="text-center text-3xl p-4 text-primary-500 font-semibold">Create Product</h1>
            <form className="w-3/4 grid grid-cols-2 justify-center gap-2 m-auto">
                <div className="space-y-2 ">
                    <Input variant="bordered"
                        type="text" size="lg"
                        // onChange={(e) => setPhone(e.target.value)}
                        value={"123"}
                        isRequired
                        label="Product name"
                        // errorMessage={errors.phone}
                        placeholder="Enter product name" />
                    <Input variant="bordered"
                        type="text" size="lg"
                        // onChange={(e) => setPhone(e.target.value)}
                        value={"123"}
                        isRequired
                        label="Price"
                        // errorMessage={errors.phone}
                        placeholder="Enter price" />
                    <Select
                        variant="bordered"
                        key={"123"}
                        color="default"
                        label="Category"
                        placeholder="Select Category"
                        defaultSelectedKeys={["cat"]}
                    >
                        <SelectItem key={"s"} value={"s"}>
                            {"sád"}
                        </SelectItem>
                    </Select>
                    <Textarea variant="bordered"
                        type="text"
                        size="lg"
                        // onChange={(e) => setAddress(e.target.value)}
                        value={"description"}
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

            </form>
        </>
    );
}

export default FormCreateProduct
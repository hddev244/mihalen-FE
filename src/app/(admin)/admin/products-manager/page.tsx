"use client"
import CategoryForm from "@/components/admin/category/Category-form";
import CategoryTable from "@/components/admin/category/Category-table";
import PageLogin from "@/components/admin/login/page";
import FormCreateProduct from "@/components/admin/product/Form-create";
import ProductTable from "@/components/admin/product/Product-table";
import { Localstorage } from "@/lib/store";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";


const ProductsManagement:NextPage = () => {
  const [isLogged, setIsLogged] = useState(true);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem(Localstorage.TOKEN);
      setIsLogged(!!storedToken);
      if (storedToken) { // Kiểm tra nếu token tồn tại trước khi gửi yêu cầu 
        const fetchData = async () => {
        }
      }
    }
  }, []);

  return isLogged ? (
    <>
      <div className="flex flex-col ">
        <h1 className="title">Products Management</h1>
        <Tabs
          color="primary"
          size="lg"
          aria-label="Tabs colors sizes selectedKey"
          className=""
        >
          <Tab
            key={"all-products"}
            title={"All Products"}>
            <Card>
              
                <ProductTable></ProductTable>
              
            </Card>
          </Tab>
          <Tab key={"Create Product"} title={"Create Product"} >
            <Card>
              <CardBody>
              <FormCreateProduct></FormCreateProduct>
              </CardBody>
            </Card>
          </Tab>
          <Tab key={"Category"} title={"Category"} >
            <Card>
              <CardBody>
              <CategoryForm></CategoryForm>
              <CategoryTable></CategoryTable>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  ) : (<PageLogin />);
}

export default ProductsManagement
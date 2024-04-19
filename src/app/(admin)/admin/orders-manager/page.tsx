"use client"
import PageLogin from "@/components/admin/login/page";
import { Localstorage } from "@/lib/store";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const OrdersManagement:NextPage = () => {
  const [isLogged, setIsLogged] = useState(true);

  useEffect(() => {
    // Check if window is defined (meaning it's running on the client-side)
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem(Localstorage.TOKEN);
      setIsLogged(!!storedToken);
    }
  }, []);
  return isLogged ? (
    <>
      <h1 className="title" >Orders Management</h1>
    </>
  ) : (<PageLogin/>);
}
export default OrdersManagement
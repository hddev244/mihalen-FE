"use client"
import PageLogin from "@/components/admin/login/page";
import { Localstorage } from "@/lib/store";
import { useEffect, useState } from "react";

function Main() {
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
      <h1 className="title">Main</h1>
      
    </>
  ) : (<PageLogin/>);
}
export default Main
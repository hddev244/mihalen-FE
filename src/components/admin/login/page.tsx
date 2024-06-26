"use client"
import LoginForm from "@/components/admin/login-form/page";
import type { NextPage } from "next";
import { useState } from "react";

const PageLogin: NextPage = () => {
  const [clickToLogin, setClickToLogin] = useState(false);
  return (
    <>
      <div className="size-full flex items-center justify-center">
        <div className="">
          { clickToLogin ? (<LoginForm></LoginForm>) : (
            <>
              <h1> Please login with admin role to continue</h1>
              <button onClick={() => setClickToLogin(true)}> login </button>
            </>
            )
          }
        </div>
      </div>
    </>
  )
}

export default PageLogin

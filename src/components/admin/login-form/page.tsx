"use client"
import { Localstorage } from "@/lib/store";
import axios, { AxiosError, HttpStatusCode } from "axios";
import type { NextPage } from "next";
import { useState } from "react";

const LoginForm: NextPage = () => {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [loginError,setLoginError] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      username : username,
      password : password
    }
    try {
      const {data} = await axios.post("http://localhost:8080/auth/login",payload);
      const logdedInfo = JSON.stringify(data.account);
      const token = data.accessToken;
      localStorage.setItem(Localstorage.LOGGED_IN_INFO,logdedInfo);
      localStorage.setItem(Localstorage.TOKEN,token);
      location.reload();
    } catch (e) {
      const error = e as AxiosError;
      if(error.response?.status === HttpStatusCode.BadRequest){
        setLoginError("Thông tin đăng nhập chưa chính xác!");
      }
      if(error.code === AxiosError.ERR_NETWORK){
        setLoginError("Không kết nối được với máy chủ, vui lòng thử lại sau !");
      }
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-1">
        <div className="flex flex-col ">
          <label className="text-xl" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            onChange={e => setUsername(e.target.value)}
            className="border rounded-lg flex-1 text-xl border-gray-400  p-2 focus:outline focus:outline-sky-500"
            value={username}
            required
          />
          <span className="block h-4 w-full"> </span>
        </div>
        <div className="flex flex-col">
          <label className="text-xl" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="border rounded-lg flex-1 text-xl border-gray-400  p-2 focus:outline focus:outline-sky-500"
            onChange={e => setPassword(e.target.value)}
            value={password}
            required
          />
          <span className="block h-4 w-full"></span>
        </div>
        <div className="grid grid-cols-2 gap-2 py-4" >
          <button className="border bg-gray-400 rounded-lg text-white font-semibold uppercase p-2 px-4 hover:outline hover:outline-sky-500"
            type="button">Forgot Password</button>
          <button className="border bg-blue-600 rounded-lg text-white font-semibold uppercase p-2 px-4 hover:outline hover:outline-sky-500"
            type="submit">Login</button>
        </div>
        <span className="block h-4 w-full text-red-500">{loginError}</span>
      </form>
    </>
  )
}

export default LoginForm
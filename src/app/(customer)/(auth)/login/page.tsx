"use client"
import React, { useState } from "react";
import { Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { MessageType } from "@/lib/object";
import Message from "@/components/Common/alert-message";
import { Localstorage } from "@/lib/store";
import { BASE_API_URL } from "@/api/api-info";
import { RedirectType, redirect, useRouter } from "next/navigation";

import type { NextPage } from "next";

const LoginPage:NextPage = () => {
    const [selected, setSelected] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<MessageType>("success");
    const router = useRouter();
    const token = localStorage.getItem(Localstorage.TOKEN);

    if (token) {
        router.push("/", { scroll: false });
    }

    const handleLogin = () => {
        if (username === "" || password === "") {
            setMessage("Please fill in all fields");
            setMessageType("error");
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 2000);
            return;
        }
        fetchData();
    }
    const fetchData = async () => {
        console.log(username, password)
        try {
            const url = `${BASE_API_URL}/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            const responseData = await response.json();
            console.log(responseData);
            if (response.ok) {
                const logdedInfo = JSON.stringify(responseData.account);
                let token = responseData.accessToken;
                token = `Bearer ${token}`
                console.log(token);
                localStorage.setItem(Localstorage.LOGGED_IN_INFO, logdedInfo);
                localStorage.setItem(Localstorage.IS_LOGGED_IN, "true");
                localStorage.setItem(Localstorage.TOKEN, token);
                setMessage("Login successful!");
                setMessageType("success");
                setShowMessage(true);
                // router.push("/");
                router.push('/', { scroll: false })
                // redirect('/', RedirectType.push);
            } else {
                setMessage(responseData.message);
                setMessageType("error");
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 2000);
            }
        } catch (error) {
            setMessage("An error occurred. Please try again later");
            setMessageType("error");
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 2000);
        }
    }
    const handleSignUp = () => {
        if (email === "" || password === "" || username === "" || fullname === "" || confirmPassword === "") {
            setMessage("Please fill in all fields");
            setMessageType("error");
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 2000);
            return;
        }
        if (password !== confirmPassword) {
            setMessage("Password and confirm password do not match");
            setMessageType("error");
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 2000);
            return;
        }
        fetchDataSignUp();
    }
    const fetchDataSignUp = async () => {
        try {
            const url = `${BASE_API_URL}/auth/register`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    username: username,
                    fullname: fullname,
                }),
            });
            const responseData = await response.json();
            if (response.ok) {
                setMessage("Account created successfully. Please login to continue");
                setMessageType("success");
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                    setSelected("login");
                }, 2000);
            } else {
                setMessage(responseData.message);
                setMessageType("error");
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 2000);
            }
        } catch (error) {
            setMessage("An error occurred. Please try again later");
            setMessageType("error");
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 2000);
        }
    }

    return (
       <>
            {showMessage && (<Message type={messageType} message={message} />)}
            <div className="flex flex-col m-auto w-full lg:w-max p-4">
                <Card className="lg:w-1/2 w-full m-auto mt-10 h-full">
                    <CardBody className="overflow-hidden">
                        <Tabs
                            fullWidth
                            size="lg"
                            aria-label="Tabs form"
                            selectedKey={selected}
                            onSelectionChange={(value) => setSelected(value as string)}
                        >
                            <Tab key="login" title="Login">
                                <form className="flex flex-col gap-4">
                                    <Input
                                        isRequired
                                        label="Username"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) =>  setUsername(e.target.value)}
                                        type="text" />
                                    <Input
                                        isRequired
                                        label="Password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        size="lg"
                                    />
                                    <p className="text-center text-lg">
                                        Need to create an account?{" "}
                                        <Link size="lg" onPress={() => setSelected("sign-up")}>
                                            Sign up
                                        </Link>
                                    </p>
                                    <div className="flex gap-2 justify-end">
                                        <Button
                                            type="button"
                                            onClick={() => handleLogin()} 
                                            fullWidth color="primary">
                                            Login
                                        </Button>
                                    </div>
                                </form>
                            </Tab>
                            <Tab key="sign-up" title="Sign up">
                                <form className="flex flex-col gap-4 ">
                                    <Input
                                        isRequired
                                        label="Username"
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter your username"
                                        type="text" />
                                    <Input
                                        isRequired
                                        label="Fullname"
                                        onChange={(e) => setFullname(e.target.value)}
                                        placeholder="Enter your fullname"
                                        type="text" />
                                    <Input
                                        isRequired
                                        label="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        type="email" />
    
                                    <Input
                                        isRequired
                                        label="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        type="password"
                                        size="lg"
                                    />
                                    <Input
                                        isRequired
                                        label="Confirm Password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        type="password"
                                        size="lg"
                                    />
                                    <p className="text-center text-small">
                                        Already have an account?{" "}
                                        <Link size="sm" onPress={() => setSelected("login")}>
                                            Login
                                        </Link>
                                    </p>
                                    <div className="flex gap-2 justify-end">
                                        <Button 
                                            type="button"
                                            onClick={() => handleSignUp()}     
                                        fullWidth color="primary">
                                            Sign up
                                        </Button>
                                    </div>
                                </form>
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            </div>
       </>
    );
}


export default LoginPage;
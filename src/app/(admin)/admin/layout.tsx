import Sidebar from "@/components/admin/sidebar/page";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles.css"
import Header from "@/components/admin/header/page";
export const metadata: Metadata = {
    title: {
        default: "Admin-Mihalen",
        template: "Aminj-Mihalen | %s"
    },
    description: "admin page"
}
const inter = Inter({ subsets: ["latin"] });
let sidebarActive:number;
export default function AdminLayout(
    { children,login }: {
        children: React.ReactNode,
        login : React.ReactNode,
    }) {
        let isLoggedIn = false;
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex w-dvw h-dvh bg-gray-300">
                    <div className="w-80 h-dvh p-2 ">
                        <div className="size-full shadow-lg bg-white rounded-md overflow-hidden border border-">
                            <Header></Header>
                            <Sidebar></Sidebar>
                        </div>
                    </div>
                        <main className="flex-1 p-2">
                        <div className="size-full shadow-lg rounded-md  bg-white border">
                         {isLoggedIn ? children : login}
                        </div>
                    </main>
                </div>
            </body>
        </html>
    )
}
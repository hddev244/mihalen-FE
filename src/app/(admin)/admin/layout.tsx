import Sidebar from "@/components/admin/sidebar/page";
import { Metadata } from "next";
import { Inter } from "next/font/google";

import "./styles.css"
import { Providers } from "@/app/providers";
export const metadata: Metadata = {
    title: {
        default: "Admin-Mihalen",
        template: "Aminj-Mihalen | %s"
    },
    description: "admin page"
}
const inter = Inter({ subsets: ["latin"] });
let sidebarActive: number;
export default function AdminLayout(
    { children }: {
        children: React.ReactNode,
    }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <div className="flex w-dvw h-dvh bg-gray-300">
                        <div className="w-96 h-dvh p-2 ">
                            <div className="size-full flex flex-col justify-between shadow-lg bg-white rounded-md overflow-hidden border border-gray-400">
                                <Sidebar></Sidebar>
                            </div>
                        </div>
                        <main className="flex-1 p-2">
                            <div className="overflow-y-auto size-full shadow-lg rounded-md p-6 pb-0  bg-white border [&>*>.title]:text-2xl [&>*>.title]:p-4 [&>*>.title]:mb-8 [&>*>.title]:border-b   [&>*>.title]:font-bold">
                                {children}
                            </div>
                        </main>
                    </div>
                </Providers>
            </body>
        </html>
    )
}
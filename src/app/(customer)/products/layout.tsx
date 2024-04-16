import ViewedProduct from "@/components/products/ViewedProduct";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: {
        absolute: "Mihalen",
    },
    description: "mihale page desc",
};

export default function ProductLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <main className="h-full min-h-[80vh] lg:w-max w-full m-auto">
                {children}
            </main>
            <ViewedProduct />
        </>
    );
}
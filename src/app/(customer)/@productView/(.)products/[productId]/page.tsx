import { Product } from "@/lib/object";
import { Localstorage } from "@/lib/store";
import { useEffect } from "react";


let product:Product = {
    id: 0,
    price: 0,
    description: "",
    category: {
        id: "",
        name: ""
    },
    name: "s",
} ;
const fetchProduct = async (): Promise<void> => {
    // const res = await fetch(`https://fakestoreapi.com/products/${params.productId}`);
    // product = await res.json();
    product.name = "product name";
}

fetchProduct();

function Page() {
    return (
        <>
            <div className="fixed bg-[#50505056] w-dvw z-[99999] h-dvh top-0 left-0">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos dolore molestiae itaque harum. Impedit obcaecati quae optio saepe, accusamus voluptatem quod, explicabo nam nisi quas, amet consequuntur aspernatur reiciendis ex!</p>

                asdasd
            </div>
        </>
    );
}

export default Page
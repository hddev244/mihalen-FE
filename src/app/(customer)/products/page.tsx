import { NextPage } from 'next';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

interface ProductPageProps {
    product: Product;
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
    return (
        <div>
            product page
        </div>
    );
};

export default ProductPage;
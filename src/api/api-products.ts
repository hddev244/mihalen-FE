import axios from "axios";

async function getProductById(id:number):Promise<Response> {
    return axios.get('/products');
}

export default getProductById;
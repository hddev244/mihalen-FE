import { VN_LOCATION_API_HOST } from "./api-info";

export interface Province {
    province_id: string;
    province_name: string;
    province_type : string;
}
export interface District {
    district_id: string;
    district_name: string;
    district_type : string;
    province_id: string;
}
export interface Ward {
    district_id: string;
    ward_id: string;
    ward_name: string;
    ward_type : string;
}

const getProvincies = async ():Promise<Province[]> => {
    const fetchData = async () => {
        const response = await fetch(`${VN_LOCATION_API_HOST}/api/province/`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        );
        const data = await response.json();
        const result:Province[] = data.results;
        return result;
    }
    return fetchData();
}

const getDistricts = async (provinceId:string): Promise<District[]> => {
    const fetchData = async () => {
        const response = await fetch(`${VN_LOCATION_API_HOST}/api/province/district/${provinceId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        );
        const data= await response.json();
        const result:District[] = data.results;
        return result;
    }
    return fetchData();
}

const getWards = async (districtId:string) : Promise<Ward[]> => {
    const fetchData = async () => {
        const response = await fetch(`${VN_LOCATION_API_HOST}/api/province/ward/${districtId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        );
        const data = await response.json();
        const result:Ward[] = data.results;

        return result;
    }
     return fetchData();
}

export default getProvincies;
export { getDistricts, getWards};
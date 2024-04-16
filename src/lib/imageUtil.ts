import { IMAGES_API_HOST } from "@/api/api-info";


export function getImage(imageId: number) {
    return `${IMAGES_API_HOST}/${imageId}`;
}
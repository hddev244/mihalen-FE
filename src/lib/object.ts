export type Account = {
    id: number,
    username: string,
    fullname: string,
    email: string,
    photo: string,
    address: string,
    phoneNumber: string,
    locked : boolean;
    createDate: string,
    modifiDate: string
    roles: [
        role: {
            id : string,
            name : string
        }
    ]
}
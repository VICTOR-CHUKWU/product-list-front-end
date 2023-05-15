export interface Auth {
    user: any,
    token: string,
}

export interface UserCred {
    name: string,
    email: string,
    password: string,
}

export interface User {
    name: string,
    email: string,
    password?: string,
    __v: any,
    _id: string
}

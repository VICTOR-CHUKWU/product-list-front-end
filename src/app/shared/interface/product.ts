export interface Product {
    name: string;
    type: string;
    price: string;
    location: string;
    description: string;
    _id: string;
    __v?: any

}

export type DefaultResponse = {
    success: boolean;
    message: string;
    product: Product
}

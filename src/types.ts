export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
}

export interface ShoppingCartItem extends Product {
    quantity: number;
}

export interface APIResponse {
    products: Product[];
}

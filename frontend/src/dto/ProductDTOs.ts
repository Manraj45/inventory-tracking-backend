export interface ProductCreationDTO {
    name: string;
    desc?: string;
    sku: string;
    price: number;
    quantity: number;
}

export interface ProductUpdateDTO {
    id: number;
    name?: string;
    desc?: string;
    sku?: string;
    price?: number;
    quantity?: number;
}

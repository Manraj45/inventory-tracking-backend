export interface ProductCreationDTO {
    id: number;
    name: string;
    desc?: string;
    sku: string;
    price: string;
    created_at: Date;
    modified_at: Date;
}

export interface ProductUpdateDTO {
    name?: string;
    desc?: string;
    sku?: string;
    price?: string;
    created_at?: Date;
    modified_at?: Date;
}

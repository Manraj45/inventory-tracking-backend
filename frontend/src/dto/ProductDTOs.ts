export interface ProductCreationDTO {
    name: string;
    desc?: string;
    sku: string;
    price: number;
    quantity: number;
    created_at: Date;
    modified_at: Date;
    deleted_at?: Date;
}

export interface ProductUpdateDTO {
    id: number;
    name?: string;
    desc?: string;
    sku?: string;
    price?: string;
    created_at?: Date;
    modified_at?: Date;
    deleted_at?: Date;
}

export interface ProductDeleteDTO {
    id: number;
    deleted_at?: Date;
}

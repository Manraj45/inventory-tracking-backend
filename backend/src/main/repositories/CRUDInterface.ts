export interface CRUD {
    create: (resource: any) => Promise<any>;
    update: (resource: any, updatedValue: any) => Promise<any>;
    get: (resource: any) => Promise<any>;
    getAll: () => Promise<any[]>;
}

export interface RelationCRUD {
    create: (resource: any) => Promise<any>;
    get: (resource: any) => Promise<any>;
}
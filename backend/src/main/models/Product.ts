import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull } from 'sequelize-typescript';

// Model of the Product table 
@Table({ timestamps: false })
export class Product extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    name!: string;

    @AllowNull
    @Column
    desc!: string;

    @Column
    sku!: string;

    @Column
    price!: number;

    @Column
    quantity!: number;

    @Column
    created_at!: Date;

    @Column
    modified_at!: Date;

    @Column
    deleted_at!: Date;
}
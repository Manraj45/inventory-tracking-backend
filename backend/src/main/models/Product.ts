import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull } from 'sequelize-typescript';

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
    created_at!: Date;

    @Column
    modified_at!: Date;
}
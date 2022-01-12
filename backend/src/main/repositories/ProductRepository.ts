import { injectable } from 'tsyringe';
import { ProductCreationDTO, ProductUpdateDTO } from '../dto/ProductDTOs';
import { CRUD } from './CRUDInterface';
import { Product } from '../models/Product';

@injectable()
export default class ProductRepository implements CRUD {
    constructor() {
    }

    public create = async (productInfo: ProductCreationDTO): Promise<Product> => {
        try {
            const createdProduct = Product.build(productInfo);
            await createdProduct.save();

            return Promise.resolve(createdProduct);
        } catch (err: any) {
            return Promise.reject(err);
        }
    };

    public delete = async (id: number): Promise<number> => {
        try {
            const deleteProductStatus = await Product.destroy({
                where: { id: id },
            });

            return Promise.resolve(deleteProductStatus);
        } catch (err: any) {
            return Promise.resolve(err);
        }
    };

    public update = async (id: number, updatedValue: ProductUpdateDTO): Promise<number> => {
        try {
            await Product.update(updatedValue, {
                where: { id: id }
            });

            return Promise.resolve(1);
        } catch (err: any) {
            return Promise.reject(err);
        }
    };

    public get = async (id: number): Promise<Product | null> => {
        try {
            const product = await Product.findByPk(id);

            return Promise.resolve(product);
        } catch (err: any) {
            return Promise.reject(err);
        }
    };

    public getAllProductWithName = async (name: string): Promise<Product[]> => {
        try {
            const products = await Product.findAll({
                where: {
                    name: name,
                },
            });

            return Promise.resolve(products);
        } catch (err: any) {
            return Promise.reject(err);
        }
    };

    public getAll = async (): Promise<Product[]> => {
        try {
            const products = await Product.findAll();

            return Promise.resolve(products);
        } catch (err: any) {
            return Promise.reject(err);
        }
    };
}

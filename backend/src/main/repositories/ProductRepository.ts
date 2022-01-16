import { injectable } from 'tsyringe';
import { ProductCreationDTO, ProductUpdateDTO } from '../dto/ProductDTOs';
import { CRUD } from './CRUDInterface';
import { Product } from '../models/Product';

// Database queries are defined here using sequelize
@injectable()
export default class ProductRepository implements CRUD {
    constructor() {
    }

    // Create product
    public create = async (productInfo: ProductCreationDTO): Promise<Product> => {
        try {
            const createdProduct = Product.build(productInfo);
            await createdProduct.save();

            return Promise.resolve(createdProduct);
        } catch (err: any) {
            return Promise.reject(err);
        }
    };

    // Update and soft delete product
    public update = async (id: number, updatedValue: ProductUpdateDTO): Promise<number> => {
        try {
            await Product.update(updatedValue, {
                where: {
                    id: id
                }
            });

            return Promise.resolve(1);
        } catch (err: any) {
            return Promise.reject(err);
        }
    };

    // Get a single product
    public get = async (id: number): Promise<Product | null> => {
        try {
            const product = await Product.findByPk(id);

            return Promise.resolve(product);
        } catch (err: any) {
            return Promise.reject(err);
        }
    };

    // Get a product by name
    public getAllProductsWithName = async (name: string): Promise<Product[]> => {
        try {
            const productsWithName = await Product.findAll({
                where: {
                    name: name,
                },
            });

            return Promise.resolve(productsWithName);
        } catch (err: any) {
            return Promise.reject(err);
        }
    };

    // Get all products
    public getAll = async (): Promise<Product[]> => {
        try {
            const allProducts = await Product.findAll();

            return Promise.resolve(allProducts);
        } catch (err: any) {
            return Promise.reject(err);
        }
    };
}

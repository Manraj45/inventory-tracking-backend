import { StatusCodes } from 'http-status-codes';
import { injectable } from 'tsyringe';
import { ProductCreationDTO, ProductUpdateDTO, ProductDeleteDTO } from '../dto/ProductDTOs';
import HttpException from '../exceptions/HttpException';
import { Product } from '../models/Product';
import ProductRepository from '../repositories/ProductRepository';
import { downloadResource } from '../utils/CSVExporter';

// Backend logic for the different actions
@injectable()
export class ProductService {
    private fields = [
        {
            label: 'ID',
            value: 'id',
        },
        {
            label: 'Name',
            value: 'name',
        },
        {
            label: 'Description',
            value: 'desc',
        },
        {
            label: 'SKU',
            value: 'sku',
        },
        {
            label: 'Price ($)',
            value: 'price',
        },
        {
            label: 'Quantity',
            value: 'quantity',
        },
        {
            label: 'Created Date',
            value: 'created_at',
        },
        {
            label: 'Modified Date',
            value: 'modified_at',
        },
        {
            label: 'Deleted Date',
            value: 'deleted_at',
        },
    ]

    constructor(
        private productRepository: ProductRepository,
    ) {
    }

    public createProduct = async (productCreationDTO: ProductCreationDTO): Promise<Product> => {
        const currentDate: Date = new Date();
        productCreationDTO.created_at = currentDate;
        productCreationDTO.modified_at = currentDate;
        productCreationDTO.deleted_at = undefined;

        if (ProductService.isThereNullValueProductCreationDTO(productCreationDTO)) {
            throw new HttpException(StatusCodes.BAD_REQUEST, 'Request data is missing some values');
        }

        const product: Product = await this.productRepository.create(productCreationDTO);

        return Promise.resolve(product);
    };

    public getProduct = async (id: number): Promise<Product | null> => {
        return this.productRepository.get(id);
    };

    public deleteProduct = async (id: number, productDeleteDTO: ProductDeleteDTO): Promise<number> => {
        const deletedDate: Date = new Date();

        productDeleteDTO.deleted_at = deletedDate;

        if (ProductService.isThereNullProductDeleteDTO(productDeleteDTO)) {
            throw new HttpException(StatusCodes.BAD_REQUEST, 'Request data is missing some values');
        }

        const deleteProduct = await this.productRepository.update(
            id,
            productDeleteDTO
        );

        return Promise.resolve(1);
    };

    public getAllProductsWithName = async (name: string): Promise<Product[] | null> => {
        return this.productRepository.getAllProductsWithName(name);
    };

    public getAllProducts = async (): Promise<Product[] | null> => {
        return this.productRepository.getAll();
    };

    public updateProduct = async (id: number, productUpdateDTO: ProductUpdateDTO): Promise<number> => {
        const modifiedDate: Date = new Date();

        productUpdateDTO.modified_at = modifiedDate;

        if (ProductService.isThereNullProductUpdateDTO(productUpdateDTO)) {
            throw new HttpException(StatusCodes.BAD_REQUEST, 'Request data is missing some values');
        }

        const updateProduct = await this.productRepository.update(
            id,
            productUpdateDTO
        );

        return Promise.resolve(updateProduct);
    };

    public exportDataToCSV = async () => {
        let data: Product[] = await this.productRepository.getAll();

        return downloadResource(this.fields, data);
    }

    public static isThereNullValueProductCreationDTO = (productCreationDTO: ProductCreationDTO): boolean => {
        if (
            productCreationDTO === undefined ||
            !productCreationDTO.name ||
            !productCreationDTO.sku ||
            !productCreationDTO.price ||
            !productCreationDTO.quantity ||
            !productCreationDTO.created_at ||
            !productCreationDTO.modified_at
        ) {
            return true;
        }
        return false;
    };

    public static isThereNullProductUpdateDTO = (productUpdateDTO: ProductUpdateDTO): boolean => {
        if (
            productUpdateDTO === undefined ||
            !productUpdateDTO.modified_at
        ) {
            return true;
        }
        return false;
    };

    public static isThereNullProductDeleteDTO = (productDeleteDTO: ProductDeleteDTO): boolean => {
        if (
            productDeleteDTO === undefined ||
            !productDeleteDTO.deleted_at
        ) {
            return true;
        }
        return false;
    };
}

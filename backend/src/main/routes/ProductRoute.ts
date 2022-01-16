import express from 'express';
import { CommonRoutesConfig } from './CommonRoutesConfig';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import { ProductService } from '../services/ProductService';
import HttpException from '../exceptions/HttpException';

// Routes for Product
@injectable()
export default class ProductRoute extends CommonRoutesConfig {
    constructor(
        @inject('express-app') app: express.Application,
        private productService: ProductService,
    ) {
        super(app, 'ProductRoute');
    }

    configureRoutes(): express.Application {
        this.getApp()
            .route(`/product`)
            // Create product
            .post(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
                try {
                    const newProduct = await this.productService.createProduct(req.body);

                    res.status(StatusCodes.CREATED).send(newProduct);
                } catch (err) {
                    next(err);
                }
            });

        this.getApp()
            .route(`/products`)
            // Get all products
            .get(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
                try {
                    const allProducts = await this.productService.getAllProducts();

                    res.status(StatusCodes.OK).send(allProducts);
                } catch (err) {
                    next(err);
                }
            });

        this.getApp()
            .route(`/product/:id`)
            // Get a specific product
            .get(
                async (req: express.Request, res: express.Response, next: express.NextFunction) => {
                    try {
                        const product = await this.productService.getProduct(Number(req.params.id));

                        res.status(StatusCodes.OK).send(product);
                    } catch (err) {
                        next(err);
                    }
                }
            )
            // Soft delete a specific product
            .delete(
                async (req: express.Request, res: express.Response, next: express.NextFunction) => {
                    try {
                        if ((await this.productService.deleteProduct(Number(req.params.id), req.body)) === 1) {
                            res.status(StatusCodes.OK).send('Deleted');
                        } else {
                            next(new HttpException(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND));
                        }
                    } catch (err) {
                        next(err);
                    }
                }
            )
            // Update a specific product
            .put(
                async (req: express.Request, res: express.Response, next: express.NextFunction) => {
                    try {
                        await this.productService.updateProduct(Number(req.params.id), req.body);

                        res.status(StatusCodes.OK).send('Updated');
                    } catch (err) {
                        next(err);
                    }
                }
            );

        this.getApp()
            .route(`/download`)
            // Export all products to csv
            .get(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
                try {
                    const csv = await this.productService.exportProductsToCSV();
                    const date = new Date();
                    const dateTime = date.toISOString()

                    res.header('Content-Type', 'text/csv');
                    res.attachment('All_Products-' + dateTime + ".csv");
                    res.status(StatusCodes.OK).send(csv);
                } catch (err) {
                    next(err);
                }
            });

        return this.getApp();
    }
}

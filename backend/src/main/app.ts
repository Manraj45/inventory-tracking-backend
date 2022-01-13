import 'reflect-metadata';
import express from 'express';
import { AppSettings } from './config/AppSettings';
import cors from 'cors';
import { container } from 'tsyringe';
import { httpMiddlewareError, failSafeHandler } from './middleware/ErrorMiddleware';
import { sequelize } from './config/sequelize';
import dotenv from 'dotenv';
import { CommonRoutesConfig } from './routes/CommonRoutesConfig';
import ProductRoute from './routes/ProductRoute';

dotenv.config();

const main = async () => {
    sequelize.authenticate().then(() => console.log('Authenticated on Sequelize'));

    const app: express.Application = express();

    const port = process.env.PORT || AppSettings.BACKEND_PORT;

    const routes: Array<CommonRoutesConfig> = [];

    app.use(express.json());

    app.use(cors());

    // Registering express app to tsyringe. This allows it to be injected in other classes.
    container.register<express.Application>('express-app', {
        useFactory: () => app,
    });

    // Instanciating the routes here:
    routes.push(container.resolve(ProductRoute));

    // Registering express error handling middleware
    app.use(httpMiddlewareError);
    app.use(failSafeHandler);

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
};

// App starting point
main().catch((err) => {
    // Catch any unexpected error
    console.error(err);
});

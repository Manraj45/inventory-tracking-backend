import 'reflect-metadata';
import express from 'express';
import { AppSettings } from './config/AppSettings';
import cors from 'cors';
import { container } from 'tsyringe';
import { httpMiddlewareError, failSafeHandler } from './middleware/ErrorMiddleware';
import { sequelize } from './config/sequelize';
import dotenv from 'dotenv';

dotenv.config();

const main = async () => {
    sequelize.authenticate().then(() => console.log('Authenticated on Sequelize'));

    const app: express.Application = express();

    const port = process.env.PORT || AppSettings.BACKEND_PORT;

    app.use(express.json());

    app.use(cors());

    // Registering express app to tsyringe. This allows it to be injected in other classes.
    // For express-app i used "useFactory" instead of "useValue" because with useFactory you can't clear it.
    container.register<express.Application>('express-app', {
        useFactory: () => app,
    });

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

import express from 'express';

// Configuring the endpoints and routes
export abstract class CommonRoutesConfig {
    private app: express.Application;
    private name: string;

    constructor(app: express.Application, name: string) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }

    public getName = (): string => {
        return this.name;
    };

    public getApp = (): express.Application => {
        return this.app;
    };

    abstract configureRoutes(): express.Application;
}

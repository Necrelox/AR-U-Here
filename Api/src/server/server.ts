import * as Controller from './controllers';
import AreUHereSpecification from './AreUHereSpecification.json'
import {DatabaseKnex} from './database/DatabaseKnex';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {config} from 'dotenv';
import {serve, setup} from 'swagger-ui-express'
import swaggerJSDoc, {OAS3Options} from 'swagger-jsdoc'
import fileUpload from "express-fileupload";

// const rateLimit = require('express-rate-limit');

export class Server {
    private app: express.Express = express();

    constructor() {
        this.app.set('title', 'Ar-U-Here - API');
        this.initializeServer();
    }

    private initializeServer() {
        config();
        this.initDefaultMiddleware();
        this.initializeRoutes();
        DatabaseKnex.initializeDatabasePool();
    }

    private initDefaultMiddleware() {
        this.initMiddlewareCors();
        this.initMiddlewareHelmet();
        this.initMiddlewareExpress();
        this.initMiddlewareSwagger();
    }

    private initMiddlewareCors() {
        this.app.use(cors({
                origin: process.env.APP_IP || '*', // Temporary
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
                credentials: true,
            }
        ));
    }

    private initMiddlewareHelmet() {
        this.app.use(helmet());
    }

    private initMiddlewareExpress() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
        }));
    }

    private initMiddlewareSwagger() {
        const options: OAS3Options = {
            swaggerDefinition: AreUHereSpecification,
            apis: ["**/*.ts"],
        }
        this.app.use('/api-docs', serve, setup(swaggerJSDoc(options)));
    }

    private initializeRoutes() {
        this.app.use('/account', new Controller.AccountController().getRouter());
        this.app.use('/user', new Controller.UserController().getRouter());
        this.app.use('/activity', new Controller.ActivityController().getRouter());
        this.app.use('/activity-user', new Controller.ActivityUserController().getRouter());
        // this.app.use('/delay', new Controller.DelayController().getRouter());
        this.app.use('/absence', new Controller.AbsenceController().getRouter());
        this.app.use('/biometric', new Controller.BiometricController().getRouter());
    }

    public run() {
        this.app.listen(process.env.PORT || 3001);
        console.log(`Server is running on port ${process.env.PORT || 3001}`);
    }
}

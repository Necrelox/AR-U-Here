import {DatabaseKnex} from './database/DatabaseKnex';
import * as Controller from './controller';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {config} from 'dotenv';
import fileUpload from "express-fileupload";

// const rateLimit = require('express-rate-limit');

export class Server {
    private app: express.Express = express();

    constructor() {
        this.initializeServer();
    }

    private initializeServer() {
        config();
        this.app.use(cors(
            {
                origin: '*', // Temporary
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
                credentials: true,
            }
        ));
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.set('title', 'Ar-U-Here - API');
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
        }));
        this.initializeRoutes();
        DatabaseKnex.initializeDatabasePool();
    }

    private initializeRoutes() {
        this.app.use('/account', new Controller.AccountController().getRouter());
        this.app.use('/user', new Controller.UserController().getRouter());
        this.app.use('/biometric', new Controller.BiometricController().getRouter());

    }

    public run() {
        this.app.listen(process.env.PORT || 3001);
        console.log(`Server is running on port ${process.env.PORT || 3001}`);
    }
}

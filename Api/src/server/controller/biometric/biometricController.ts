import {MiddlewareManager} from "../../middleware";
import {BiometricUtils} from "./utils/biometricUtils";
import {BiometricQueries, UserQueries} from "../../database";

import path from 'path';
import {User} from "../../model";

import {Router, IRouter, Request, Response, NextFunction} from 'express';
import bindings from "bindings";

export class BiometricController extends BiometricUtils {
    private _router: IRouter = Router();
    private _Orchestrateur = bindings('../prod/addons/build/Release/Orchestrateur.node');

    constructor() {
        super();
        this.initializeBiometricController();
    }

    private initializeBiometricController() {
        this._router.use('/', async (req: Request, res: Response, next: NextFunction) => {
            await MiddlewareManager.middlewares(req, res, next);
        });
        this._router.post('/',async (req: Request, res: Response) => {
            await this.postMethodBiometric(req, res);
        });
        this._router.get('/', async (req: Request, res: Response) => {
            await this.getMethodBiometric(req, res);
        });
    }

    private async postMethodBiometric(req: Request, res: Response) {
        try {
            const tokenFKUser: User.ITokenFKUser[] = await UserQueries.getUserByFKToken({
                token: (req.headers.authorization)?.split(' ')[1]
            });
            await BiometricQueries.deleteBiometric({
                userUuid: (tokenFKUser[0])?.userUuid
            });

            const path : string = super.getFileIdPath(req);
            const newPath : string = this._Orchestrateur.Rongeur(path);
            await BiometricQueries.addBiometric({
                path: newPath,
                userUuid: tokenFKUser[0]?.userUuid
            });

            res.status(200).send({
                code: 'OK',
                message: 'Success',
            })
        } catch (error: any) {
            res.status(500).send({
                code: '_Orchestrateur::Rongeur',
                message: error?.message
            });
        }
    }

    private async getMethodBiometric(req: Request, res: Response) {
        try {
            const tokenFKUser: User.ITokenFKUser[] = await UserQueries.getUserByFKToken({
                token: (req.headers.authorization)?.split(' ')[1]
            });
            res.status(200).sendFile(path.resolve((await super.getBiometric(tokenFKUser[0]?.userUuid as Buffer)).path));
        } catch (error: any) {
            res.status(500).send({
                code: error?.code,
                message: error?.message
            });
        }
    }

    public getRouter() {
        return this._router;
    }
}

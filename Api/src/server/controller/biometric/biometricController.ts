import {MiddlewareManager} from "../../middleware";
import {Router, IRouter, Request, Response, NextFunction} from 'express';

import bindings from "bindings";
import {BiometricUtils} from "./utils/biometricUtils";
import {BiometricQueries} from "../../database";
import * as Models from "../../model";
import * as DBQueries from "../../database";

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
    }

    private async postMethodBiometric(req: Request, res: Response) {
        try {
            const path : string = super.getFileIdPath(req);
            const newPath : string = this._Orchestrateur.Rongeur(path);
            const tokenFKUser: Models.User.ITokenFKUser[] = await DBQueries.UserQueries.getUserByFKToken({
                token: (req.headers.authorization)?.split(' ')[1]
            });
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

    public getRouter() {
        return this._router;
    }

}

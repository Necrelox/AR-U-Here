import {MiddlewareManager} from "../../middleware";
import {Router, IRouter, Request, Response, NextFunction} from 'express';

import bindings from "bindings";
import {BiometricUtils} from "./utils/biometricUtils";

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

            res.status(200).send({
                code: 'OK',
                message: 'Success',
                data: newPath
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

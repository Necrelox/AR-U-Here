import {bearerToken, blackListedChecker} from "../../middleware";
import {BiometricQueries, TokenModelQueries} from "../../database";
import {BiometricUtils} from "./utils/biometricUtils";
import {ITokenFKUser} from "../../models";


import {Router, IRouter, Request, Response,} from 'express';
import path from 'path';
import bindings from "bindings";

export class BiometricController extends BiometricUtils {
    private _router: IRouter = Router();
    private _Orchestrateur = bindings('../prod/addons/build/Release/Orchestrateur.node');

    constructor() {
        super();
        this.initializeBiometricController();
    }

    private initializeBiometricController() {
        this._router.use('/', bearerToken, blackListedChecker);
        this._router.post('/',async (req: Request, res: Response) => {
            await this.postMethodBiometric(req, res);
        });
        this._router.get('/', async (req: Request, res: Response) => {
            await this.getMethodBiometric(req, res);
        });
    }

    private async postMethodBiometric(req: Request, res: Response) {
        try {
            const tokenFKUser: ITokenFKUser[] = await TokenModelQueries.getFKUser({
                token: (req.headers.authorization)?.split(' ')[1]
            }, {
                userUuid: true,
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
            const tokenFKUser: ITokenFKUser[] = await TokenModelQueries.getFKUser({
                token: (req.headers.authorization)?.split(' ')[1]
            }, {
                userUuid: true,
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

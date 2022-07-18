import {Router, IRouter, Request, Response, NextFunction} from 'express';
import {BiometricUtils} from './utils/biometricUtils';
import {BearerToken} from '../../middleware/bearerToken/bearerToken';
// import * as Models from '../../model';
// import * as DBQueries from '../../database';

export class BiometricController extends BiometricUtils {
    private _router: IRouter = Router();

    constructor() {
        super();
        this.initializeAccountController();
    }

    private initializeAccountController() {
        this._router.use('/', async (req: Request, res: Response, next: NextFunction) => {
            await BearerToken.checkToken(req, res, next);
        });
        this._router.get('/', async (req: Request, res: Response) => {
            await this.getMethodBiometric(req, res);
        });
        this._router.post('/', async (req: Request, res: Response) => {
            await this.postMethodBiometric(req, res);
        });
    }

    /** Biometric */
    private async getMethodBiometric(_req: Request, res: Response) {
        try {
            // const tokenFKUser: Models.User.ITokenFKUser[] = await DBQueries.UserQueries.getUserByFKToken({
            //     token: (req.headers.authorization)?.split(' ')[1]!
            // });
            res.status(200).send({
                code: 'OK',
            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }

    private async postMethodBiometric(_req: Request, res: Response) {
        try {

            res.status(200).send({
                code: 'OK',
            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }


    public getRouter(): IRouter {
        return this._router;
    }
}

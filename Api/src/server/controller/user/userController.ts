import {Router, IRouter, Request, Response, NextFunction} from 'express';
import {UserUtils} from './utils/userUtils';
import {BearerToken} from '../../middleware/bearerToken/bearerToken';
import * as Models from '../../model';
import * as DBQueries from '../../database';

export class UserController extends UserUtils {
    private _router: IRouter = Router();

    constructor() {
        super();
        this.initializeAccountController();
    }

    private initializeAccountController() {
        this._router.use('/me', async (req: Request, res: Response, next: NextFunction) => {
            await BearerToken.checkToken(req, res, next);
        });
        this._router.get('/me', async (req: Request, res: Response) => {
            await this.getMethodMe(req, res);
        });
        this._router.put('/me', async (req: Request, res: Response) => {
            await this.putMethodMe(req, res);
        });

        this._router.use('/me/logo', async (req: Request, res: Response, next: NextFunction) => {
            await BearerToken.checkToken(req, res, next);
        });
        this._router.get('/me/logo', async (req: Request, res: Response) => {
            await this.getMethodMeLogo(req, res);
        });
        this._router.post('/me/logo', async (req: Request, res: Response) => {
            await this.postMethodMeLogo(req, res);
        });
        this._router.delete('/me/logo', async (req: Request, res: Response) => {
            await this.deleteMethodMeLogo(req, res);
        });
    }

    /** ME */
    private async getMethodMe(req: Request, res: Response) {
        try {
            const tokenFKUser: Models.User.ITokenFKUser[] = await DBQueries.UserQueries.getUserByFKToken({
                token: (req.headers.authorization)!.split(' ')[1]!
            });
            res.status(200).send({
                code: 'OK',
                user: {
                    username: tokenFKUser[0]!.username,
                    email: tokenFKUser[0]!.email,
                    address: tokenFKUser[0]!.address,
                    phone: tokenFKUser[0]!.phone,
                    activityMessage: tokenFKUser[0]!.activityMessage,
                    isConnected: tokenFKUser[0]!.isConnected,
                    createdAt: tokenFKUser[0]!.createdAt,
                }
            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }

    private async putMethodMe(req: Request, res: Response) {
        try {
            if (Object.keys(req.body).length > 0) {
                const userReflect = await super.transformBodyToUserForUpdate(req.body);
                await DBQueries.UserQueries.updateUserByTokenTransaction(userReflect, {
                    token: (req.headers.authorization)!.split(' ')[1]!
                });
            } else {
                res.status(200).send({
                    code: 'OK',
                    message: 'No data to update.'
                });
            }
            res.status(200).send({
                code: 'OK',
                message: 'User updated.'
            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }

    /** LOGO */
    private async getMethodMeLogo(_req: Request, res: Response) {
        try {
            // todo ne peux pas être fais sans la la librairie
            res.status(200).send({
                code: 'OK',
            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }

    private async postMethodMeLogo(_req: Request, res: Response) {
        try {
            // todo à faire
            res.status(200).send({
                code: 'OK',
            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }

    private async deleteMethodMeLogo(_req: Request, res: Response) {
        try {
            // todo à faire
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

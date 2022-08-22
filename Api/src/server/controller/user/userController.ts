import * as Models from '../../model';
import * as DBQueries from '../../database';
import {UserUtils} from './utils/userUtils';
import {MiddlewareManager} from "../../middleware";

import {Router, IRouter, Request, Response, NextFunction} from 'express';
import {UuidTransform} from "../../tools";

export class UserController extends UserUtils {
    private _router: IRouter = Router();

    constructor() {
        super();
        this.initializeAccountController();
    }

    private initializeAccountController() {
        this._router.use('/me', async (req: Request, res: Response, next: NextFunction) => {
            await MiddlewareManager.middlewares(req, res, next);
        });
        this._router.get('/me', async (req: Request, res: Response) => {
            await this.getMethodMe(req, res);
        });
        this._router.get('/user-email', async (req: Request, res: Response) => {
            await this.getMethodUserByEmail(req, res);
        });
        this._router.put('/me', async (req: Request, res: Response) => {
            await this.putMethodMe(req, res);
        });
        this._router.use('/me/logo', async (req: Request, res: Response, next: NextFunction) => {
            await MiddlewareManager.middlewares(req, res, next);
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
        this._router.use('/role', async (req: Request, res: Response, next: NextFunction) => {
            await MiddlewareManager.middlewares(req, res, next);
        });
        this._router.get('/role', async (req: Request, res: Response) => {
            await this.getMethodRole(req, res);
        });
    }

    /** ME */
    private async getMethodMe(req: Request, res: Response) {
        try {
            const tokenFKUser: Models.User.ITokenFKUser[] = await DBQueries.UserQueries.getUserByFKToken({
                token: (req.headers.authorization)?.split(' ')[1]
            });
            res.status(200).send({
                code: 'OK',
                user: {
                    username: (tokenFKUser[0])?.username,
                    email: (tokenFKUser[0])?.email,
                    activityMessage: (tokenFKUser[0])?.activityMessage,
                    isConnected: (tokenFKUser[0])?.isConnected,
                    createdAt: (tokenFKUser[0])?.createdAt,
                }
            });
        } catch (error) {
            res.status(500).send({error});
        }
    }
    
    private async getMethodUserByEmail(req: Request, res: Response) {
        try {
            const userEmail: string = req.query?.email as string;
            const user: Models.User.IUser[] = await DBQueries.UserQueries.getUserByEmail(userEmail);
            res.status(200).send({
                code: 'OK',
                user: {
                    username: (user[0])?.username,
                    email: (user[0])?.email,
                    activityMessage: (user[0])?.activityMessage,
                    isConnected: (user[0])?.isConnected,
                    createdAt: (user[0])?.createdAt,
                    uuid: UuidTransform.fromBinaryUUID(user[0]?.uuid as Buffer),
                }
            });
        } catch (error) {
            res.status(500).send({error});
        }
    }

    private async putMethodMe(req: Request, res: Response) {
        try {
            if (Object.keys(req.body).length > 0) {
                const userReflect = await super.transformBodyToUserForUpdate(req.body);
                await DBQueries.UserQueries.updateUserByTokenTransaction(userReflect, {
                    token: (req.headers.authorization)?.split(' ')[1]
                });
            } else {
                res.status(200).send({
                    code: 'OK',
                    message: 'No data to update.'
                });
            }
            res.status(200).send({
                code: 'OK',
                message: 'User updated successfully.'
            });
        } catch (error) {
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
        } catch (error) {
            res.status(500).send({error});
        }
    }

    private async postMethodMeLogo(_req: Request, res: Response) {
        try {
            // todo à faire
            res.status(200).send({
                code: 'OK',
            });
        } catch (error) {
            res.status(500).send({error});
        }
    }

    private async deleteMethodMeLogo(_req: Request, res: Response) {
        try {
            // todo à faire
            res.status(200).send({
                code: 'OK',

            });
        } catch (error) {
            res.status(500).send({error});
        }
    }

    /** ROLE */
    private async getMethodRole(req: Request, res: Response) {
        try {
            const tokenFKUser: Models.User.ITokenFKUser[] = await DBQueries.UserQueries.getUserByFKToken({
                token: (req.headers.authorization)?.split(' ')[1]
            });
            res.status(200).send({
                code: 'OK',
                role: (tokenFKUser[0])?.role,
            });
        } catch (error) {
            res.status(500).send({error});
        }
    }

    public getRouter(): IRouter {
        return this._router;
    }
}

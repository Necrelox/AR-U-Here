import {Router, IRouter, Request, Response} from 'express';
import {UserUtils} from './utils/userUtils';
import {UserQueries, TokenModelQueries} from '../../database';
import {ITokenFKUser} from '../../models';
import {bearerToken, blackListedChecker} from "../../middleware";


export class UserController extends UserUtils {
    private _router: IRouter = Router();

    constructor() {
        super();
        this.initializeAccountController();
    }

    private initializeAccountController() {
        this._router.use('/me', bearerToken, blackListedChecker);
        this._router.get('/me', async (req: Request, res: Response) => {
            await this.getMethodMe(req, res);
        });
        this._router.put('/me', async (req: Request, res: Response) => {
            await this.putMethodMe(req, res);
        });

        this._router.use('/role', bearerToken, blackListedChecker);
        this._router.get('/role', async (req: Request, res: Response) => {
            await this.getMethodRole(req, res);
        });
    }

    /** ME */
    private async getMethodMe(req: Request, res: Response) {
        try {
            const tokenFKUser: ITokenFKUser[] = await TokenModelQueries.getFKUser({
                token: (req.headers.authorization)?.split(' ')[1]
            }, {
                username: true,
                email: true,
                phone: true,
                address: true,
                activityMessage: true,
                userCreatedAt: true,
            });
            res.status(200).send({
                code: 'OK',
                user: {
                    username: (tokenFKUser[0])?.username,
                    email: (tokenFKUser[0])?.email,
                    phone: (tokenFKUser[0])?.phone,
                    address: (tokenFKUser[0])?.address,
                    activityMessage: (tokenFKUser[0])?.activityMessage,
                    userCreatedAt: (tokenFKUser[0])?.userCreatedAt,
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

                await UserQueries.updateUserByTokenTransaction(userReflect, {
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

    /** ROLE */
    private async getMethodRole(req: Request, res: Response) {
        try {
            const tokenFKUser: ITokenFKUser[] = await TokenModelQueries.getFKUser({
                token: (req.headers.authorization)?.split(' ')[1]
            }, {
                role: true,
            });
            res.status(200).send({
                code: 'OK',
                role: tokenFKUser[0]?.role
            });
        } catch (error) {
            res.status(500).send({error});
        }
    }

    public getRouter(): IRouter {
        return this._router;
    }
}

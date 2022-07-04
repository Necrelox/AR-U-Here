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

        this._router.use('/me/friend', async (req: Request, res: Response, next: NextFunction) => {
            await BearerToken.checkToken(req, res, next);
        });
        this._router.get('/me/friend', async (req: Request, res: Response) => {
            await this.getMethodMeUserFriend(req, res);
        });
        this._router.delete('/me/friend', async (req: Request, res: Response) => {
            await this.deleteMethodMeUserFriend(req, res);
        });

        this._router.use('/me/friend-request', async (req: Request, res: Response, next: NextFunction) => {
            await BearerToken.checkToken(req, res, next);
        });
        this._router.get('/me/friend-request', async (req: Request, res: Response) => {
            await this.getMethodMeUserFriendRequest(req, res);
        });
        this._router.post('/me/friend-request', async (req: Request, res: Response) => {
            await this.postMethodMeUserFriendRequest(req, res);
        });
        this._router.delete('/me/friend-request', async (req: Request, res: Response) => {
            await this.deleteMethodMeUserFriendRequest(req, res);
        });
    }

    /** ME */
    private async getMethodMe(req: Request, res: Response) {
        try {
            const tokenFKUser: Models.User.ITokenFKUser[] = await DBQueries.UserQueries.getUserByFKToken({
                token: (req.headers.authorization)?.split(' ')[1]!
            });
            res.status(200).send({
                code: 'OK',
                user: {
                    username: tokenFKUser[0]!.username,
                    email: tokenFKUser[0]!.email,
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
                    token: (req.headers.authorization)?.split(' ')[1]!
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

    /** USER FRIEND */

    private async getMethodMeUserFriend(req: Request, res: Response) {
        try {
            const tokenFKUser: Models.User.ITokenFKUser[] = await DBQueries.UserQueries.getUserByFKToken({
                token: (req.headers.authorization)?.split(' ')[1]!
            });

            const friendsFKUsers: Models.User.IFriendFKUser[] = await DBQueries.UserQueries.getFriendsByFKUserUuid(tokenFKUser[0]!.uuid!);

            res.status(200).send({
                code: 'OK',
                message: 'Get friends list.',
                friends: friendsFKUsers.map((friendsFKUser: Models.User.IFriendFKUser) => {
                    return {
                        friendUuid: friendsFKUser.friend,
                        username: friendsFKUser.username,
                        activityMessage: friendsFKUser.activityMessage,
                        isConnected: friendsFKUser.isConnected,
                        createdAt: friendsFKUser.createdAt,
                    };
                })
            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }

    private async deleteMethodMeUserFriend(req: Request, res: Response) {
        try {
            await super.checkPostContainFriend(req.body);
            const tokenFKUser: Models.User.ITokenFKUser[] = await DBQueries.UserQueries.getUserByFKToken({
                token: (req.headers.authorization)?.split(' ')[1]!
            });
            const friend: Models.User.IUser = await super.getUserByReflect({
                username: req.body.friend
            });

            await DBQueries.UserQueries.deleteFriend({
                user: friend.uuid!,
                friend: tokenFKUser[0]!.uuid!
            });

            await DBQueries.UserQueries.deleteFriend({
                friend: friend.uuid!,
                user: tokenFKUser[0]!.uuid!
            });

            res.status(200).send({
                code: 'OK',
                message: 'Friend deleted.'
            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }

    /** USER FRIEND REQUEST  */
    private async getMethodMeUserFriendRequest(req: Request, res: Response) {
        try {
            const tokenFKUser: Models.User.ITokenFKUser[] = await DBQueries.UserQueries.getUserByFKToken({
                token: (req.headers.authorization)?.split(' ')[1]!
            });

            const meRequestedBy: Models.User.IFriendRequestFKUser[] = await DBQueries.UserQueries.getUserByFKFriendRequestOnSending({
                userRequested: tokenFKUser[0]!.uuid!
            });
            const meSentRequestsTo: Models.User.IFriendRequestFKUser[] = await DBQueries.UserQueries.getUserByFKFriendRequestOnRequested({
                userSendingRequest: tokenFKUser[0]!.uuid!
            });
            res.status(200).send({
                code: 'OK',
                message: 'Get friends request list.',
                meRequestedBy: meRequestedBy.map((item: Models.User.IFriendRequestFKUser) => {
                    return {
                        username: item.username,
                        activityMessage: item.activityMessage,
                        isConnected: item.isConnected,
                        createdAt: item.createdAt,
                    };
                }),
                meSentRequestsTo: meSentRequestsTo.map((item: Models.User.IFriendRequestFKUser) => {
                    return {
                        username: item.username,
                        activityMessage: item.activityMessage,
                        isConnected: item.isConnected,
                        createdAt: item.createdAt,
                    };
                })
            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }

    private async postMethodMeUserFriendRequest(req: Request, res: Response) {
        try {
            await super.checkPostContainUserRequested(req.body);
            const tokenFKUser: Models.User.ITokenFKUser[] = await DBQueries.UserQueries.getUserByFKToken({
                token: (req.headers.authorization)?.split(' ')[1]!
            });
            const userRequested: Models.User.IUser = await super.getUserByReflect({username: req.body.userRequested});
            await super.checkIfUserRequestedNameIsNotSameToHimSelf(tokenFKUser[0]!.username!, userRequested.username!);

            await super.checkIfUserIsNotAlreadyFriend(tokenFKUser[0]!.uuid!, userRequested.uuid!);
            await super.checkUserSendingHasAlreadySendToTheUserRequested(tokenFKUser[0]!.uuid!, userRequested.uuid!);

            let message = await super.checkIfUserRequestHasAlreadySendRequestToTheUserSendTheRequest(tokenFKUser[0]!.uuid!, userRequested.uuid!);
            if (!message) {
                await super.addFriendRequest(tokenFKUser[0]!.userUuid!, userRequested.uuid!);
                message = 'Friend request sent !';
            }
            res.status(200).send({
                code: 'OK',
                message
            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }

    private async deleteMethodMeUserFriendRequest(req: Request, res: Response) {
        try {
            await super.checkPostContainUserRequested(req.body);
            const tokenFKUser: Models.User.ITokenFKUser[] = await DBQueries.UserQueries.getUserByFKToken({
                token: (req.headers.authorization)?.split(' ')[1]!
            });
            const userRequested: Models.User.IUser = await super.getUserByReflect({username: req.body.userRequested});
            await super.checkIfUserRequestedNameIsNotSameToHimSelf(tokenFKUser[0]!.username!, userRequested.username!);
            await super.deleteUserFriendRequestSendingAndReceived(tokenFKUser[0]!.uuid!, userRequested.uuid!);
            res.status(200).send({
                code: 'OK',
                message: 'Friend request deleted.'
            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }


    public getRouter(): IRouter {
        return this._router;
    }
}

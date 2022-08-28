import {Router, IRouter, Request, Response} from 'express';
import {ActivityUserUtils} from './utils/activityUserUtils';

import {UserModelQueries, ActivityModelQueries, ActivityUserModelQueries, TokenModelQueries} from '../../../database';
import {IActivity, IActivityUserFKActivity, ITokenFKUser, IUser} from '../../../models';

import {bearerToken, blackListedChecker} from "../../../middleware";

export class ActivityUserController extends ActivityUserUtils{
    private _router: IRouter = Router();

    constructor() {
        super();
        this.initializeActivityUserController();
    }

    private initializeActivityUserController() {
        this._router.use('/', bearerToken, blackListedChecker);
        this._router.post('/', async (req: Request, res: Response) => {
            await this.postMethodActivityUser(req, res);
        });
        this._router.get('/', async (req: Request, res: Response) => {
            await this.getMethodActivityUser(req, res);
        });
    }

    private async postMethodActivityUser(req: Request, res: Response) {
        try {
            const bearerToken: string = req.headers.authorization?.split(' ')[1] as string;
            await super.checkRolePermission(bearerToken);

            await super.checkRequestContainBothParams(req.body);
            const activityKey: string = req.body.activityKey as string;
            const username: string = req.body.username as string;

            const activity: Partial<IActivity>[] = await ActivityModelQueries.get({
                activityKey
            }, {
                uuid: true,
            });

            const user: Partial<IUser>[] = await UserModelQueries.get({
                username
            }, {
                uuid: true,
            });
            await ActivityUserModelQueries.create({
                userUuid: user[0]?.uuid,
                activityUuid: activity[0]?.uuid,
            });
            res.status(200).send({
                code: 'OK',
                message: 'ActivityUser created successfully'
            });
        } catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async getMethodActivityUser(req: Request, res: Response) {
        try {
            const bearerToken: string = req.headers.authorization?.split(' ')[1] as string;
            const tokenFkUser: Partial<ITokenFKUser>[] = await TokenModelQueries.getFKUser({
                token: bearerToken
            }, {
                userUuid: true
            });

            const activityUserFKActivity: Partial<IActivityUserFKActivity>[] = await ActivityUserModelQueries.getFKActivity({
                userUuid: tokenFkUser[0]?.userUuid
            }, {
                startTime: true,
                endTime: true,
                name: true,
                description: true,
                studyLevel: true,
                activityKey: true,
            });

            res.status(200).send({
                code: 'OK',
                myActivities: activityUserFKActivity
            });
        } catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    public getRouter(): IRouter {
        return this._router;
    }
}

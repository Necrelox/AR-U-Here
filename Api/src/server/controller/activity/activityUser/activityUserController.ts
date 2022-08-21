import * as DBQueries from '../../../database';
import {ActivityUserUtils} from './utils/activityUserUtils';
import {MiddlewareManager} from "../../../middleware";
import {UuidTransform} from "../../../tools";
import { Activity } from 'server/model';
import {Router, IRouter, Request, Response, NextFunction} from 'express';

export class ActivityUserController extends ActivityUserUtils {
    private _router: IRouter = Router();

    constructor() {
        super();
        this.initializeActivityUserController();
    }

    private initializeActivityUserController() {
        this._router.use('/', async (req: Request, res: Response, next: NextFunction) => {
            await MiddlewareManager.middlewares(req, res, next);
        });
        this._router.post('/', async (req: Request, res: Response) => {
            await this.createMethodActivityUser(req, res);
        });
        this._router.get('/', async (req: Request, res: Response) => {
            await this.getMethodActivityUserByUuid(req, res);
        });
    }

    private async createMethodActivityUser(req: Request, res: Response) {
        try {
            const activityUuid: Buffer = UuidTransform.toBinaryUUID(req.query.activityUuid as string);
            const userUuid: Buffer = UuidTransform.toBinaryUUID(req.query.userUuid as string);

            await DBQueries.ActivityUserQueries.createActivityUser({
                activityUuid,
                userUuid,
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

    private async getMethodActivityUserByUuid(req: Request, res: Response) {
        try{
            const uuid: Buffer = UuidTransform.toBinaryUUID(req.query.uuid as string);
            const activityUser: Activity.IActivityUser[] =
            await DBQueries.ActivityUserQueries.getActivityUserById(uuid);
            res.status(200).send({
                code: 'OK',
                activityUser: activityUser.map(acUser => {
                    return {
                        userUuid: UuidTransform.fromBinaryUUID(acUser?.userUuid as Buffer),
                        activityUuid: UuidTransform.fromBinaryUUID(acUser?.activityUuid as Buffer),
                        uuid: UuidTransform.fromBinaryUUID(acUser?.uuid as Buffer),
                    }
                }),
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
import * as DBQueries from '../../../database';
import {ActivityUtils} from './utils/activityUtils';
import {MiddlewareManager} from "../../../middleware";
import {UuidTransform} from "../../../tools";
import {Router, IRouter, Request, Response, NextFunction} from 'express';
import { Activity } from 'server/model';

export class ActivityController extends ActivityUtils {
    private _router: IRouter = Router();

    constructor() {
        super();
        this.initializeActivityController();
    }

    private initializeActivityController() {
        this._router.use('/', async (req: Request, res: Response, next: NextFunction) => {
            await MiddlewareManager.middlewares(req, res, next);
        });
        this._router.get('/all', async (req: Request, res: Response) => {
            await this.getMethodActivities(req, res);
        });
        this._router.get('/activityKey', async (req: Request, res: Response) => {
            await this.getMethodActivityByActivityKey(req, res);
        });
        this._router.post('/', async (req: Request, res: Response) => {
            await this.postMethodActivity(req, res);
        });
        this._router.put('/', async (req: Request, res: Response) => {
            await this.putMethodActivity(req, res);
        });
        this._router.delete('/', async (req: Request, res: Response) => {
            await this.deleteMethodActivity(req, res);
        });
    }

    private async getMethodActivities(_req: Request, res: Response) {
        try{
            const activities: Activity.IActivity[] = await DBQueries.ActivityQueries.getAllActivities();
            res.status(200).send({
                code: 'OK',
                allActivities: activities.map(activity => {
                    return {
                        uuid: UuidTransform.fromBinaryUUID(activity.uuid as Buffer),
                        activityKey: activity.activityKey,
                        name: activity.name,
                        startTime: activity.startTime,
                        endTime: activity.endTime,
                        description: activity.description,
                        studyLevel: activity.studyLevel,
                    }
                }),
            });
        } catch (error) {
            res.status(500).send({
                code: 'ERROR',
                message: 'Error creating activity'
            });
        }
    }


    private async getMethodActivityByActivityKey(req: Request, res: Response) {
        try {
            super.checkRequestContainActivityKey(req.query);
            const activityKey: string = req.query.activityKey as string;
            const uuid: Buffer = (await DBQueries.ActivityQueries.getActivityByActivityKey(activityKey))[0]?.uuid as Buffer;
            const activity: Activity.IActivity[] = await DBQueries.ActivityQueries.getActivityByUuid({uuid});
            res.status(200).send({
                code: 'OK',
                activity: {
                    uuid: UuidTransform.fromBinaryUUID(activity[0]?.uuid as Buffer),
                    activityKey: activity[0]?.activityKey,
                    name: activity[0]?.name,
                    startTime: activity[0]?.startTime,
                    endTime: activity[0]?.endTime,
                    description: activity[0]?.description,
                    studyLevel: activity[0]?.studyLevel,
                }
            });

        }catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async postMethodActivity(req: Request, res: Response) {

        try {

            await super.checkPostContainActivityKeyANDNameANDStartANDEndTime(req.body);
            await DBQueries.ActivityQueries.createActivity({
                activityKey: req.body.activityKey,
                name: req.body.name,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
            });

            res.status(200).send({
                code: 'OK',
                message: 'Activity created successfully'
            });

        } catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async putMethodActivity(req: Request, res: Response) {
        try{
            if (Object.keys(req.body).length > 0) {
                super.checkRequestContainActivityKey(req.query);
                const activitykey: string = req.query.activityKey as string;
                const uuid: Buffer = (await DBQueries.ActivityQueries.getActivityByActivityKey(activitykey))[0]?.uuid as Buffer;
                const activityReflect = await super.transformBodyToActivityForUpdate(req.body);
                await DBQueries.ActivityQueries.updateActivity(activityReflect, uuid);
            }else{
                res.status(200).send({
                    code: 'OK',
                    message: 'No data to update'
                });
            }
            res.status(200).send({
                code: 'OK',
                message: 'Activity updated successfully'
            });
        }
        catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async deleteMethodActivity(req: Request, res: Response) {
        try{
            super.checkRequestContainActivityKey(req.query);
            const activitykey: string = req.query.activityKey as string;
            const uuid: Buffer = (await DBQueries.ActivityQueries.getActivityByActivityKey(activitykey))[0]?.uuid as Buffer;
            await DBQueries.ActivityQueries.deleteActivity(uuid);
            res.status(200).send({
                code: 'OK',
                message: 'Activity deleted successfully'
            });
        }
        catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    public getRouter(): IRouter {
        return this._router;
    }
}
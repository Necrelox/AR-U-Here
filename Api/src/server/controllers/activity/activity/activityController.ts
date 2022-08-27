import {Router, IRouter, Request, Response} from 'express';
import {IActivity} from '../../../models';
import {ActivityUtils} from './utils/activityUtils';

import {bearerToken, blackListedChecker} from "../../../middleware";
import {ActivityModelQueries} from "../../../database";

export class ActivityController extends ActivityUtils {
    private _router: IRouter = Router();

    constructor() {
        super();
        this.initializeActivityController();
    }

    private initializeActivityController() {
        this._router.use('/', bearerToken, blackListedChecker);
        this._router.post('/', async (req: Request, res: Response) => {
            await this.postMethodActivity(req, res);
        });
        this._router.get('/', async (req: Request, res: Response) => {
            await this.getMethodActivity(req, res);
        });

        this._router.put('/', async (req: Request, res: Response) => {
            await this.putMethodActivity(req, res);
        });
        this._router.delete('/', async (req: Request, res: Response) => {
            await this.deleteMethodActivity(req, res);
        });
    }

    private async postMethodActivity(req: Request, res: Response) {
        try {
            const bearerToken : string = req.headers.authorization?.split(' ')[1] as string;
            await super.checkPostContainActivityKeyANDNameANDStartANDEndTime(req.body);
            const activity: IActivity = req.body;
            await super.checkRolePermission(bearerToken);
            await ActivityModelQueries.create(activity);
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

    private async getMethodActivity(req: Request, res: Response) {
        try {
            const activityReflect: Partial<IActivity> = req.body;
            const activities: Partial<IActivity>[] = await super.getActivity(activityReflect);
            res.status(200).send({
                code: 'OK',
                activities: activities.map(activity => {
                    return {
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
                error
            });
        }
    }

    private async putMethodActivity(req: Request, res: Response) {
        try {
            const bearerToken: string = req.headers.authorization?.split(' ')[1] as string;
            await super.checkRolePermission(bearerToken);

            if (Object.keys(req.body).length > 0) {
                await super.checkRequestContainActivityKey(req.body);
                const activityKey: string = req.body.activityKey as string;
                const activityReflect: Partial<IActivity> = req.body;
                await ActivityModelQueries.update(activityReflect, {
                    activityKey: activityKey,
                });
            } else {
                res.status(200).send({
                    code: 'OK',
                    message: 'No data to update'
                });
            }
            res.status(200).send({
                code: 'OK',
                message: 'Activity updated successfully'
            });
        } catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async deleteMethodActivity(req: Request, res: Response) {
        try {
            const activityReflect: Partial<IActivity> = req.body;
            await ActivityModelQueries.delete(activityReflect);

            res.status(200).send({
                code: 'OK',
                message: 'Activity deleted successfully'
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

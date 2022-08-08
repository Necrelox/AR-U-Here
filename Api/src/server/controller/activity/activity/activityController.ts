import * as DBQueries from '../../../database';
import {ActivityUtils} from './utils/activityUtils';
import {MiddlewareManager} from "../../../middleware";

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
        this._router.get('/:uuid', async (req: Request, res: Response) => {
            await this.getMethodActivityById(req, res);
        });
        this._router.post('/', async (req: Request, res: Response) => {
            await this.createMethodActivity(req, res);
        });
        this._router.put('/', async (req: Request, res: Response) => {
            await this.updateMethodActivity(req, res);
        });
        this._router.delete('/', async (req: Request, res: Response) => {
            await this.deleteMethodActivity(req, res);
        });
    }

    /** Activities */
    private async getMethodActivities(req: Request, res: Response) {
        try{
            const activities: Activity.IActivity[] = await DBQueries.ActivityQueries.getAllActivities();
            console.log(activities);
            console.log(req);
            res.status(200).send({
                code: 'OK',
                allActivities: activities
            });
        } catch (error) {
            res.status(500).send({
                code: 'ERROR',
                message: 'Error creating activity'
            });
        }
    }
    
    private async getMethodActivityById(req: Request, res: Response) {
        try{
            const uuid: string = req.originalUrl.split('/')[2]!;
            console.log(uuid);
            const activity = await DBQueries.ActivityQueries.getActivityById(uuid);
            console.log(activity);
            res.status(200).send({
                code: 'OK',
                activity: {
                    uuid: activity[0]?.uuid,
                    name: activity[0]?.name,
                    startTime: activity[0]?.startTime,
                    endTime: activity[0]?.endTime,
                    description: activity[0]?.description,
                    studyLevel: activity[0]?.studyLevel,
                }
            });
        } catch (error) {
            res.status(500).send({
                code: 'ERROR',
                message: 'Error retrievingg activity by uuid'
            });
        }
    }

    private async createMethodActivity(req: Request, res: Response) {

        try {

            await super.checkPostContainNameANDStartANDEndTime(req.body);
            await DBQueries.ActivityQueries.createActivity({
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

    private async updateMethodActivity(req: Request, res: Response) {
        //todo
        const activity = await DBQueries.ActivityQueries.updateActivity(req.body);
        res.json(activity);
    }

    private async deleteMethodActivity(req: Request, res: Response) {
        //todo
        const activity = await DBQueries.ActivityQueries.deleteActivity(req.params.id);
        res.json(activity);
    }

    public getRouter(): IRouter {
        return this._router;
    }
}

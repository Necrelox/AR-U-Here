import * as DBQueries from '../../../database';
import {ActivityUtils} from './utils/activityUtils';
import {MiddlewareManager} from "../../../middleware";

import {Router, IRouter, Request, Response, NextFunction} from 'express';

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
        this._router.get('/', async (req: Request, res: Response) => {
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

    /** 
     * Activities:
     * getAllActivities         //call to activity
     * getActivityById          //call to actity
     * getActivityByUserId      //call to activity_User
     * getUserByActivityId      //call to activity_user
     * 
     * createActivity           //call to activity
     * updateActivity           //call to activity
     * deleteActivity           //call to activity
     * 
     * 
     * 
     * Delay:
     * getDelayById             //call to delay
     * getDelayByActivityId     //call to delay inner join activity_user
     * getDelayByUserId         //call to delay inner join activity_user
     * getAllDelays             //call to delay
     * 
     * createDelay              //call to delay
     * updateDelay              //call to delay
     * deleteDelay              //call to delay
     * 
     * 
     * 
     * Absences:
     * getAbsenceById           //call to absence
     * getAbsenceByActivityId   //call to absence inner join activity_user
     * getAbsenceByUserId       //call to absence inner join activity_user
     * getAllAbsences           //call to absence
     * 
     * createAbsence            //call to absence
     * updateAbsence            //call to absence
     * deleteAbsence            //call to absence
     */

    /** Activities */
    private async getMethodActivities(req: Request, res: Response) {
        const activities = await DBQueries.ActivityQueries.getAllActivities();
        console.log(req.body);
        res.json(activities);
    }
    
    private async getMethodActivityById(req: Request, res: Response) {
        const activity = await DBQueries.ActivityQueries.getActivityById(req.params.id);
        res.json(activity);
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
        const activity = await DBQueries.ActivityQueries.updateActivity(req.body);
        res.json(activity);
    }

    private async deleteMethodActivity(req: Request, res: Response) {
        const activity = await DBQueries.ActivityQueries.deleteActivity(req.params.id);
        res.json(activity);
    }

    public getRouter(): IRouter {
        return this._router;
    }
}

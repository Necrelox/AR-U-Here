import * as DBQueries from '../../../database';
import {ActivityUserUtils} from './utils/activityUserUtils';
import {MiddlewareManager} from "../../../middleware";

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
        this._router.get('/absence/activity', async (req: Request, res: Response) => {
            await this.getMethodAbsenceByActivityId(req, res);
        });
        this._router.get('/absence/user', async (req: Request, res: Response) => {
            await this.getMethodAbsenceByUserId(req, res);
        });
        this._router.get('/delay/activity', async (req: Request, res: Response) => {
            await this.getMethodDelayByActivityId(req, res);
        });
        this._router.get('/delay/user', async (req: Request, res: Response) => {
            await this.getMethodDelayByUserId(req, res);
        });
        this._router.get('/user', async (req: Request, res: Response) => {
            await this.getMethodUserByActivityId(req, res);
        });
        this._router.get('/activity', async (req: Request, res: Response) => {
            await this.getMethodActivityByUserId(req, res);
        });
    }


    /** Activity */

    private async getMethodUserByActivityId(req: Request, res: Response) {
        const user = await DBQueries.ActivityUserQueries.getUserByActivityId(req.params.id);
        res.json(user);
    }

    private async getMethodActivityByUserId(req: Request, res: Response) {
        const activities = await DBQueries.ActivityUserQueries.getActivityByUserId(req.params.id);
        res.json(activities);
    }


    /** Absence */
    
    private async getMethodAbsenceByActivityId(req: Request, res: Response) {
        const absences = await DBQueries.ActivityUserQueries.getAbsenceByActivityId(req.params.id);
        res.json(absences);
    }

    private async getMethodAbsenceByUserId(req: Request, res: Response) {
        const absences = await DBQueries.ActivityUserQueries.getAbsenceByUserId(req.params.id);
        res.json(absences);
    }


    /** Delay */

    private async getMethodDelayByActivityId(req: Request, res: Response) {
        const delays = await DBQueries.ActivityUserQueries.getDelayByActivityId(req.params.id);
        res.json(delays);
    }

    private async getMethodDelayByUserId(req: Request, res: Response) {
        const delays = await DBQueries.ActivityUserQueries.getDelayByUserId(req.params.id);
        res.json(delays);
    }


    public getRouter(): IRouter {
        return this._router;
    }
}

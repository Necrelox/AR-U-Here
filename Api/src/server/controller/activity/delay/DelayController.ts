import * as DBQueries from '../../../database';
import {DelayUtils} from './utils/DelayUtils';
import {MiddlewareManager} from "../../../middleware";

import {Router, IRouter, Request, Response, NextFunction} from 'express';

export class DelayController extends DelayUtils {
    private _router: IRouter = Router();

    constructor() {
        super();
        this.initializeDelayController();
    }

    private initializeDelayController() {
        this._router.use('/', async (req: Request, res: Response, next: NextFunction) => {
            await MiddlewareManager.middlewares(req, res, next);
        });
        this._router.get('/', async (req: Request, res: Response) => {
            await this.getMethodDelayById(req, res);
        });
        this._router.get('/all', async (req: Request, res: Response) => {
            await this.getMethodAllDelays(req, res);
        });
        this._router.post('/', async (req: Request, res: Response) => {
            await this.createMethodDelay(req, res);
        });
        this._router.put('/', async (req: Request, res: Response) => {
            await this.updateMethodDelay(req, res);
        });
        this._router.delete('/', async (req: Request, res: Response) => {
            await this.deleteMethodDelay(req, res);
        });
    }


    private async getMethodDelayById(req: Request, res: Response) {
        const delay = await DBQueries.DelayQueries.getDelayById(req.params.id);
        res.json(delay);
    }

    private async getMethodAllDelays(req: Request, res: Response) {
        const delays = await DBQueries.DelayQueries.getAllDelays();
        console.log(req.body);
        res.json(delays);
    }

    private async createMethodDelay(req: Request, res: Response) {
        const delay = await DBQueries.DelayQueries.createDelay(req.body);
        res.json(delay);
    }

    private async updateMethodDelay(req: Request, res: Response) {
        const delay = await DBQueries.DelayQueries.updateDelay(req.body);
        res.json(delay);
    }

    private async deleteMethodDelay(req: Request, res: Response) {
        const delay = await DBQueries.DelayQueries.deleteDelay(req.params.id);
        res.json(delay);
    }
    

    public getRouter(): IRouter {
        return this._router;
    }
}

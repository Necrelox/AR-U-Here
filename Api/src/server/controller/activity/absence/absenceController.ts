import * as DBQueries from '../../../database';
import {AbsenceUtils} from './utils/absenceUtils';
import {MiddlewareManager} from "../../../middleware";

import {Router, IRouter, Request, Response, NextFunction} from 'express';

export class AbsenceController extends AbsenceUtils {
    private _router: IRouter = Router();

    constructor() {
        super();
        this.initializeAbsenceController();
    }

    private initializeAbsenceController() {
        this._router.use('/', async (req: Request, res: Response, next: NextFunction) => {
            await MiddlewareManager.middlewares(req, res, next);
        });
        this._router.get('/', async (req: Request, res: Response) => {
            await this.getMethodAllAbsences(req, res);
        });
        this._router.get('/', async (req: Request, res: Response) => {
            await this.getMethodAbsenceById(req, res);
        });
        this._router.post('/', async (req: Request, res: Response) => {
            await this.createMethodAbsence(req, res);
        });
        this._router.put('/', async (req: Request, res: Response) => {
            await this.updateMethodAbsence(req, res);
        });
        this._router.delete('/', async (req: Request, res: Response) => {
            await this.deleteMethodAbsence(req, res);
        });
    }

    
    private async getMethodAllAbsences(req: Request, res: Response) {
        const absences = await DBQueries.AbsenceQueries.getAllAbsences();
        console.log(req.body);
        res.json(absences);
    }

    private async getMethodAbsenceById(req: Request, res: Response) {
        const absence = await DBQueries.AbsenceQueries.getAbsenceById(req.params.id);
        res.json(absence);
    }
    private async createMethodAbsence(req: Request, res: Response) {
        const absence = await DBQueries.AbsenceQueries.createAbsence(req.body);
        res.json(absence);
    }

    private async updateMethodAbsence(req: Request, res: Response) {
        const absence = await DBQueries.AbsenceQueries.updateAbsence(req.body);
        res.json(absence);
    }

    private async deleteMethodAbsence(req: Request, res: Response) {
        const absence = await DBQueries.AbsenceQueries.deleteAbsence(req.params.id);
        res.json(absence);
    }


    public getRouter(): IRouter {
        return this._router;
    }
}

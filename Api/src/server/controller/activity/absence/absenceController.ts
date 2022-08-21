import * as DBQueries from '../../../database';
import {AbsenceUtils} from './utils/absenceUtils';
import {MiddlewareManager} from "../../../middleware";
import {UuidTransform} from "../../../tools";
import { Activity } from 'server/model';
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
        this._router.get('/byuser', async (req: Request, res: Response) => {
            await this.getMethodAbsenceByUserUuid(req, res);
        });
        this._router.get('/byactivity', async (req: Request, res: Response) => {
            await this.getMethodAbsenceByActivityUuid(req, res);
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
        this._router.delete('/byuuids', async (req: Request, res: Response) => {
            await this.deleteMethodAbsenceByUserAndActivityUuid(req, res);
        });
    }

    private async getMethodAbsenceByUserUuid(req: Request, res: Response) {
        try{
            const uuid: Buffer = UuidTransform.toBinaryUUID(req.query.uuid as string);
            const absence: Activity.IAbsence[] = 
            await DBQueries.AbsenceQueries.getAbsenceById(uuid);
            res.status(200).send({
                code: 'OK',
                absence: absence.map(abs => {
                    return {
                        justification: abs?.justification,
                        acceptedJustification: abs?.acceptedJustification,
                        activityUserUuid: UuidTransform.fromBinaryUUID(abs?.activityUserUuid as Buffer),
                        uuid: UuidTransform.fromBinaryUUID(abs?.uuid as Buffer),
                    }
                }),
            });
        } catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async getMethodAbsenceByActivityUuid(req: Request, res: Response) {
        try{
            const uuid: Buffer = UuidTransform.toBinaryUUID(req.query.uuid as string);
            const absence: Activity.IAbsence[] = 
            await DBQueries.AbsenceQueries.getAbsenceByActivityUuid(uuid);
            res.status(200).send({
                code: 'OK',
                absence: absence.map(abs => {
                    return {
                        justification: abs?.justification,
                        acceptedJustification: abs?.acceptedJustification,
                        activityUserUuid: UuidTransform.fromBinaryUUID(abs?.activityUserUuid as Buffer),
                        uuid: UuidTransform.fromBinaryUUID(abs?.uuid as Buffer),
                    }
                }),
            });
        } catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async createMethodAbsence(req: Request, res: Response) {
        try {
            const uuid: Buffer = UuidTransform.toBinaryUUID(req.query.uuid as string);
            await DBQueries.AbsenceQueries.createAbsence({
                justification: req.body.justification,
                acceptedJustification: req.body.acceptedJustification,
                activityUserUuid: uuid,
            });

            res.status(200).send({
                code: 'OK',
                message: 'Absence created successfully'
            });

        } catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async updateMethodAbsence(req: Request, res: Response) {
        try{
            const uuid: Buffer = UuidTransform.toBinaryUUID(req.query.uuid as string);
            const absenceReflect = await super.transformBodyToAbsenceForUpdate(req.body);
            await DBQueries.AbsenceQueries.updateAbsence(absenceReflect, uuid);
            res.status(200).send({
                code: 'OK',
                message: 'Absence updated successfully'
            });
        }
        catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async deleteMethodAbsence(req: Request, res: Response) {        
        try{
            const uuid: Buffer = UuidTransform.toBinaryUUID(req.query.uuid as string);
            await DBQueries.AbsenceQueries.deleteAbsence(uuid);
            res.status(200).send({
                code: 'OK',
                message: 'Absence deleted successfully'
            });
        }
        catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async deleteMethodAbsenceByUserAndActivityUuid(req: Request, res: Response) {        
        try{
            const userUuid: Buffer = UuidTransform.toBinaryUUID(req.query.userUuid as string);
            const activityUuid: Buffer = UuidTransform.toBinaryUUID(req.query.activityUuid as string);
            const absence = await DBQueries.AbsenceQueries.deleteAbsenceByUserAndActivityUuid(userUuid, activityUuid);
            res.status(200).send({
                code: 'OK',
                message: absence
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
import * as DBQueries from '../../../database';
import {AbsenceUtils} from './utils/absenceUtils';
import {MiddlewareManager} from "../../../middleware";
import {UuidTransform} from "../../../tools";
import { Activity, User } from 'server/model';
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
        this._router.get('/username', async (req: Request, res: Response) => {
            await this.getMethodAbsenceByUsername(req, res);
        });
        this._router.get('/activityKey', async (req: Request, res: Response) => {
            await this.getMethodAbsenceByActivityKey(req, res);
        });
        this._router.post('/', async (req: Request, res: Response) => {
            await this.postMethodAbsence(req, res);
        });
        this._router.put('/', async (req: Request, res: Response) => {
            await this.putMethodAbsence(req, res);
        });
        this._router.delete('/', async (req: Request, res: Response) => {
            await this.deleteMethodAbsence(req, res);
        });
        this._router.delete('/usernameAndActivityKey', async (req: Request, res: Response) => {
            await this.deleteMethodAbsenceByUsernameAndActivityKey(req, res);
        });
    }

    private async getMethodAbsenceByUsername(req: Request, res: Response) {
        try{
            super.checkRequestContainUsername(req.query);
            const username: string = req.query.username as string;
            const user: User.IUser[] = (await DBQueries.AbsenceQueries.getUserByUserName(username));
            const absence: Activity.IAbsenceFKActivity[] = await DBQueries.AbsenceQueries.getAbsenceByUuid(user[0]?.uuid as Buffer);
            res.status(200).send({
                code: 'OK',
                absence: absence.map(abs => {
                    return {
                        justification: abs?.justification,
                        acceptedJustification: abs?.acceptedJustification,
                        activityKey: abs.activityKey,
                    }
                }),
            });
        } catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async getMethodAbsenceByActivityKey(req: Request, res: Response) {
        try{
            super.checkRequestContainActivityKey(req.query);
            const activityKey: string = req.query.activityKey as string;
            const activity: Activity.IActivity[] = await DBQueries.AbsenceQueries.getActivityByActivityKey(activityKey);
            const absence: Activity.IAbsenceFKUser[] = await DBQueries.AbsenceQueries.getAbsenceByActivityUuid(activity[0]?.uuid as Buffer);
            res.status(200).send({
                code: 'OK',
                absence: absence.map(abs => {
                    return {
                        justification: abs?.justification,
                        acceptedJustification: abs?.acceptedJustification,
                        username: abs.username,
                    }
                }),
            });
        } catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async postMethodAbsence(req: Request, res: Response) {
        try {
            super.checkRequestContainBothParams(req.query);
            const activityKey: string = req.query.activityKey as string;
            const username: string = req.query.username as string;
            const userUuid: Buffer = (await DBQueries.AbsenceQueries.getUserByUserName(username))[0]?.uuid as Buffer;
            const activityUuid: Buffer = (await DBQueries.AbsenceQueries.getActivityByActivityKey(activityKey))[0]?.uuid as Buffer;
            const uuid: Buffer = (await DBQueries.AbsenceQueries
                .getActivityUserByUsernameAndActivityKey(userUuid, activityUuid))[0]?.uuid as Buffer;
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

    private async putMethodAbsence(req: Request, res: Response) {
        try{
            if (Object.keys(req.body).length > 0) {
                super.checkRequestContainBothParams(req.query);
                const activitykey: string = req.query.activityKey as string;
                const username: string = req.query.username as string;
                const userUuid: Buffer = (await DBQueries.AbsenceQueries.getUserByUserName(username))[0]?.uuid as Buffer;
                const activityUuid: Buffer = (await DBQueries.AbsenceQueries.getActivityByActivityKey(activitykey))[0]?.uuid as Buffer;
                const absenceReflect = await super.transformBodyToAbsenceForUpdate(req.body);
                await DBQueries.AbsenceQueries.updateAbsence(absenceReflect, activityUuid, userUuid);
            }else{
                res.status(200).send({
                    code: 'OK',
                    message: 'No data to update'
                });
            }
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
            super.checkRequestContainUuid(req.query);
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

    private async deleteMethodAbsenceByUsernameAndActivityKey(req: Request, res: Response) {
        try{
            super.checkRequestContainBothParams(req.query);
            const activityKey: string = req.query.activityKey as string;
            const username: string = req.query.username as string;
            const userUuid: Buffer = (await DBQueries.AbsenceQueries.getUserByUserName(username))[0]?.uuid as Buffer;
            const activityUuid: Buffer = (await DBQueries.AbsenceQueries.getActivityByActivityKey(activityKey))[0]?.uuid as Buffer;
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
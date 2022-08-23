import * as DBQueries from '../../../database';
import {DelayUtils} from './utils/delayUtils';
import {MiddlewareManager} from "../../../middleware";
import {UuidTransform} from "../../../tools";
import { Activity } from 'server/model';
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
        this._router.get('/userUuid', async (req: Request, res: Response) => {
            await this.getMethodDelayByUserUuid(req, res);
        });
        this._router.get('/activityUuid', async (req: Request, res: Response) => {
            await this.getMethodDelayByActivityUuid(req, res);
        });
        this._router.post('/', async (req: Request, res: Response) => {
            await this.postMethodDelay(req, res);
        });
        this._router.put('/', async (req: Request, res: Response) => {
            await this.putMethodDelay(req, res);
        });
        this._router.delete('/', async (req: Request, res: Response) => {
            await this.deleteMethodDelay(req, res);
        });
        this._router.delete('/userAndActivityUuid', async (req: Request, res: Response) => {
            await this.deleteMethodDelayByUserAndActivityUuid(req, res);
        });
    }


    private async getMethodDelayByUserUuid(req: Request, res: Response) {
        try{
            super.checkRequestContainUuid(req.query);
            const uuid: Buffer = UuidTransform.toBinaryUUID(req.query.uuid as string);
            const delay: Activity.IDelay[] =
            await DBQueries.DelayQueries.getDelayByUuid(uuid);
            res.status(200).send({
                code: 'OK',
                delay: delay.map(del => {
                    return{
                        delayInMinutes: del?.delayInMinutes,
                        justification: del?.justification,
                        acceptedJustification: del?.acceptedJustification,
                        activityUserUuid: UuidTransform.fromBinaryUUID(del?.activityUserUuid as Buffer),
                        uuid: UuidTransform.fromBinaryUUID(del?.uuid as Buffer),
                }}),
            });
        } catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async getMethodDelayByActivityUuid(req: Request, res: Response) {
        try{
            super.checkRequestContainUuid(req.query);
            const uuid: Buffer = UuidTransform.toBinaryUUID(req.query.uuid as string);
            const delay: Activity.IDelay[] =
            await DBQueries.DelayQueries.getDelayByActivityUuid(uuid);
            res.status(200).send({
                code: 'OK',
                delay: delay.map(del => {
                    return{
                        delayInMinutes: del?.delayInMinutes,
                        justification: del?.justification,
                        acceptedJustification: del?.acceptedJustification,
                        activityUserUuid: UuidTransform.fromBinaryUUID(del?.activityUserUuid as Buffer),
                        uuid: UuidTransform.fromBinaryUUID(del?.uuid as Buffer),
                }}),
            });
        } catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async postMethodDelay(req: Request, res: Response) {
        try {
            super.checkRequestContainUuid(req.query);
            const uuid: Buffer = UuidTransform.toBinaryUUID(req.query.uuid as string);
            await DBQueries.DelayQueries.createDelay({
                delayInMinutes: req.body.delayInMinutes,
                justification: req.body.justification,
                acceptedJustification: req.body.acceptedJustification,
                activityUserUuid: uuid,
            });

            res.status(200).send({
                code: 'OK',
                message: 'Delay created successfully'
            });

        } catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async putMethodDelay(req: Request, res: Response) {
        try{
            if (Object.keys(req.body).length > 0) {
                super.checkRequestContainUuid(req.query);
                const uuid: Buffer = UuidTransform.toBinaryUUID(req.query.uuid as string);
                const delayReflect = await super.transformBodyToDelayForUpdate(req.body);
                await DBQueries.DelayQueries.updateDelay(delayReflect, uuid);
            }else{
                res.status(200).send({
                    code: 'OK',
                    message: 'No data to update'
                });
            }
            res.status(200).send({
                code: 'OK',
                message: 'Delay updated successfully'
            });
        }
        catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async deleteMethodDelay(req: Request, res: Response) {
        try{
            super.checkRequestContainUuid(req.query);
            const uuid: Buffer = UuidTransform.toBinaryUUID(req.query.uuid as string);
            await DBQueries.DelayQueries.deleteDelay(uuid);
            res.status(200).send({
                code: 'OK',
                message: 'Delay deleted successfully'
            });
        }
        catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async deleteMethodDelayByUserAndActivityUuid(req: Request, res: Response) {
        try{
            super.checkRequestContainBothUuids(req.query);
            const userUuid: Buffer = UuidTransform.toBinaryUUID(req.query.userUuid as string);
            const activityUuid: Buffer = UuidTransform.toBinaryUUID(req.query.activityUuid as string);
            await DBQueries.DelayQueries.deleteDelayByUserAndActivityUuid(userUuid, activityUuid);
            res.status(200).send({
                code: 'OK',
                message: "Delay deleted successfully"
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

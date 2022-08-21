import * as DBQueries from '../../../database';
import {DelayUtils} from './utils/DelayUtils';
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
        this._router.get('/byuser', async (req: Request, res: Response) => {
            await this.getMethodDelayByUserUuid(req, res);
        });
        this._router.get('/byactivity', async (req: Request, res: Response) => {
            await this.getMethodDelayByActivityUuid(req, res);
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
        this._router.delete('/byuuids', async (req: Request, res: Response) => {
            await this.deleteMethodDelayByUserAndActivityUuid(req, res);
        });
    }


    private async getMethodDelayByUserUuid(req: Request, res: Response) {
        try{
            const uuid: Buffer = UuidTransform.toBinaryUUID(req.query.uuid as string);
            const delay: Activity.IDelay[] = 
            await DBQueries.DelayQueries.getDelayById(uuid);
            res.status(200).send({
                code: 'OK',
                delay: delay.map(del => {
                    return{
                        delayInMinutes: del?.delayInMinutes,
                        justification: del?.justification,
                        acceptedJustification: del?.acceptedJustification,
                        attendedActivity: del?.attendedActivity,
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
            const uuid: Buffer = UuidTransform.toBinaryUUID(req.query.uuid as string);
            const delay: Activity.IDelay[] = 
            await DBQueries.DelayQueries.getDelayByActivityUuid(uuid);
            res.status(200).send({
                code: 'OK',
                delay: delay.map(delay => {
                    return{
                        delayInMinutes: delay?.delayInMinutes,
                        justification: delay?.justification,
                        acceptedJustification: delay?.acceptedJustification,
                        attendedActivity: delay?.attendedActivity,
                        activityUserUuid: UuidTransform.fromBinaryUUID(delay?.activityUserUuid as Buffer),
                        uuid: UuidTransform.fromBinaryUUID(delay?.uuid as Buffer),
                }}),
            });
        } catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async createMethodDelay(req: Request, res: Response) {
        try {
            const uuid: Buffer = UuidTransform.toBinaryUUID(req.query.uuid as string);
            await DBQueries.DelayQueries.createDelay({
                delayInMinutes: req.body.delayInMinutes,
                justification: req.body.justification,
                acceptedJustification: req.body.acceptedJustification,
                attendedActivity: req.body.attendedActivity,
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

    private async updateMethodDelay(req: Request, res: Response) {
        try{
            const uuid: Buffer = UuidTransform.toBinaryUUID(req.query.uuid as string);
            const delayReflect = await super.transformBodyToDelayForUpdate(req.body);
            await DBQueries.DelayQueries.updateDelay(delayReflect, uuid);
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
            const userUuid: Buffer = UuidTransform.toBinaryUUID(req.query.userUuid as string);
            const activityUuid: Buffer = UuidTransform.toBinaryUUID(req.query.activityUuid as string);
            const delay = await DBQueries.DelayQueries.deleteDelayByUserAndActivityUuid(userUuid, activityUuid);
            res.status(200).send({
                code: 'OK',
                message: delay
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
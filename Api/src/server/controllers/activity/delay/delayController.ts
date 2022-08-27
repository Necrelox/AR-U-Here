// import {DelayQueries} from '../../../database';
// import {DelayUtils} from './utils/delayUtils';
// import {UuidTransform} from "../../../tools";
// import {Activity, User} from '../../../models';
// import {blackListedChecker, bearerToken} from "../../../middleware";
// import {Router, IRouter, Request, Response} from 'express';
//
// export class DelayController extends DelayUtils {
//     private _router: IRouter = Router();
//
//     constructor() {
//         super();
//         this.initializeDelayController();
//     }
//
//     private initializeDelayController() {
//         this._router.use('/user-uuid', bearerToken, blackListedChecker);
//         this._router.get('/user-uuid', async (req: Request, res: Response) => {
//             await this.getMethodDelayByUsername(req, res);
//         });
//
//         this._router.use('/activity-uuid', bearerToken, blackListedChecker);
//         this._router.get('/activity-uuid', async (req: Request, res: Response) => {
//             await this.getMethodDelayByActivityUuid(req, res);
//         });
//
//         this._router.use('/username-and-activity-key', bearerToken, blackListedChecker);
//         this._router.delete('/username-and-activity-key', async (req: Request, res: Response) => {
//             await this.deleteMethodDelayByUserAndActivityUuid(req, res);
//         });
//
//         this._router.use('/', bearerToken, blackListedChecker);
//         this._router.post('/', async (req: Request, res: Response) => {
//             await this.postMethodDelay(req, res);
//         });
//         this._router.put('/', async (req: Request, res: Response) => {
//             await this.putMethodDelay(req, res);
//         });
//         this._router.delete('/', async (req: Request, res: Response) => {
//             await this.deleteMethodDelay(req, res);
//         });
//     }
//
//     private async getMethodDelayByUsername(req: Request, res: Response) {
//         try {
//             await super.checkRequestContainUsername(req.query);
//             const username: string = req.query.username as string;
//             const user: User.IUser[] = (await DelayQueries.getUserByUserName(username));
//             const delay: Activity.IDelayFKActivity[] = await DelayQueries.getDelayByUuid(user[0]?.uuid as Buffer);
//             res.status(200).send({
//                 code: 'OK',
//                 absence: delay.map(del => {
//                     return {
//                         justification: del?.justification,
//                         acceptedJustification: del?.acceptedJustification,
//                         activityKey: del.activityKey,
//                     }
//                 }),
//             });
//         } catch (error) {
//             res.status(500).send({
//                 error
//             });
//         }
//     }
//
//     private async getMethodDelayByActivityUuid(req: Request, res: Response) {
//         try {
//             await super.checkRequestContainActivityKey(req.query);
//             const activityKey: string = req.query.activityKey as string;
//             const activity: Activity.IActivity[] = await DelayQueries.getActivityByActivityKey(activityKey);
//             const delay: Activity.IAbsenceFKUser[] = await DelayQueries.getDelayByActivityUuid(activity[0]?.uuid as Buffer);
//             res.status(200).send({
//                 code: 'OK',
//                 absence: delay.map(del => {
//                     return {
//                         justification: del?.justification,
//                         acceptedJustification: del?.acceptedJustification,
//                         username: del.username,
//                     }
//                 }),
//             });
//         } catch (error) {
//             res.status(500).send({
//                 error
//             });
//         }
//     }
//
//     private async postMethodDelay(req: Request, res: Response) {
//         try {
//             await super.checkRequestContainBothParams(req.query);
//             const activityKey: string = req.query.activityKey as string;
//             const username: string = req.query.username as string;
//             const userUuid: Buffer = (await DelayQueries.getUserByUserName(username))[0]?.uuid as Buffer;
//             const activityUuid: Buffer = (await DelayQueries.getActivityByActivityKey(activityKey))[0]?.uuid as Buffer;
//             const uuid: Buffer = (await DelayQueries
//                 .getActivityUserByUsernameAndActivityKey(userUuid, activityUuid))[0]?.uuid as Buffer;
//             await DelayQueries.createDelay({
//                 justification: req.body.justification,
//                 acceptedJustification: req.body.acceptedJustification,
//                 delayInMinutes: req.body.delayInMinutes,
//                 activityUserUuid: uuid,
//             });
//             res.status(200).send({
//                 code: 'OK',
//                 message: 'Absence created successfully'
//             });
//         } catch (error) {
//             res.status(500).send({
//                 error
//             });
//         }
//     }
//
//     private async putMethodDelay(req: Request, res: Response) {
//         try{
//             if (Object.keys(req.body).length > 0) {
//                 await super.checkRequestContainBothParams(req.query);
//                 const activityKey: string = req.query.activityKey as string;
//                 const username: string = req.query.username as string;
//                 const userUuid: Buffer = (await DelayQueries.getUserByUserName(username))[0]?.uuid as Buffer;
//                 const activityUuid: Buffer = (await DelayQueries.getActivityByActivityKey(activityKey))[0]?.uuid as Buffer;
//                 const delayReflect = await super.transformBodyToDelayForUpdate(req.body);
//                 await DelayQueries.updateDelay(delayReflect, activityUuid, userUuid);
//             }else{
//                 res.status(200).send({
//                     code: 'OK',
//                     message: 'No data to update'
//                 });
//             }
//             res.status(200).send({
//                 code: 'OK',
//                 message: 'Delay updated successfully'
//             });
//         }
//         catch (error) {
//             res.status(500).send({
//                 error
//             });
//         }
//     }
//
//     private async deleteMethodDelay(req: Request, res: Response) {
//         try {
//             await super.checkRequestContainUuid(req.query);
//             const uuid: Buffer = UuidTransform.toBinaryUUID(req.query.uuid as string);
//             await DelayQueries.deleteDelay(uuid);
//             res.status(200).send({
//                 code: 'OK',
//                 message: 'Delay deleted successfully'
//             });
//         } catch (error) {
//             res.status(500).send({
//                 error
//             });
//         }
//     }
//
//     private async deleteMethodDelayByUserAndActivityUuid(req: Request, res: Response) {
//         try {
//             await super.checkRequestContainBothParams(req.query);
//             const activityKey: string = req.query.activityKey as string;
//             const username: string = req.query.username as string;
//             const userUuid: Buffer = (await DelayQueries.getUserByUserName(username))[0]?.uuid as Buffer;
//             const activityUuid: Buffer = (await DelayQueries.getActivityByActivityKey(activityKey))[0]?.uuid as Buffer;
//             const delay = await DelayQueries.deleteDelayByUserAndActivityUuid(userUuid, activityUuid);
//             res.status(200).send({
//                 code: 'OK',
//                 message: delay
//             });
//         } catch (error) {
//             res.status(500).send({
//                 error
//             });
//         }
//     }
//
//     public getRouter(): IRouter {
//         return this._router;
//     }
// }

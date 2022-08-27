import {Router, IRouter, Request, Response} from 'express';
import {
    AbsenceModelQueries,
    ActivityUserModelQueries,
    ActivityModelQueries,
    TokenModelQueries
} from '../../../database';
import {AbsenceUtils} from './utils/absenceUtils';
import {bearerToken, blackListedChecker} from "../../../middleware";
import {IActivity, IActivityUser, ITokenFKUser, IAbsence, IActivityUserFKActivity} from "../../../models";

export class AbsenceController extends AbsenceUtils {
    private _router: IRouter = Router();

    constructor() {
        super();
        this.initializeAbsenceController();
    }

    private initializeAbsenceController() {
        this._router.use('/', bearerToken, blackListedChecker);
        this._router.post('/', async (req: Request, res: Response) => {
            await this.postMethodAbsence(req, res);
        });
        this._router.get('/', async (req: Request, res: Response) => {
            await this.getMethodAbsence(req, res);
        });
        this._router.put('/', async (req: Request, res: Response) => {
            await this.putMethodAbsence(req, res);
        });

        this._router.delete('/', async (req: Request, res: Response) => {
            await this.deleteMethodAbsence(req, res);
        });

    }

    private async postMethodAbsence(req: Request, res: Response) {
        try {
            await super.checkRequestContainBothParams(req.body);

            const activity: Partial<IActivity>[] = await ActivityModelQueries.get({
                activityKey: req.body.activityKey
            }, {
                uuid: true,
            });

            const activityUsers: Partial<IActivityUser>[] = await ActivityUserModelQueries.get({
                activityUuid: activity[0]?.uuid,
            }, {
                uuid: true,
            });

            for (const activityUser of activityUsers) {
                await AbsenceModelQueries.create({
                    activityUserUuid: activityUser.uuid
                });
            }

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

    private async getMethodAbsence(req: Request, res: Response) {
        try {

            const bearerToken: string = req.headers.authorization?.split(' ')[1] as string;
            const tokenFkUser: Partial<ITokenFKUser>[] = await TokenModelQueries.getFKUser({
                token: bearerToken
            }, {
                userUuid: true
            });

            const activityUserFkActivities: Partial<IActivityUserFKActivity>[] = await ActivityUserModelQueries.getFKActivity({
                userUuid: tokenFkUser[0]?.userUuid,
            }, {
                uuid: 'ACTIVITY_USER.uuid',
                activityKey: true,
                name: true,
                description: true,
                startTime: true,
                endTime: true,
            });

            const result: {
                activityKey?: string,
                name?: string,
                description?: string,
                startTime?: Date,
                endTime?: Date,
                justification?: string,
                acceptedJustification?: boolean,
            }[] = [];


            for (const activityUserFkActivity of activityUserFkActivities) {

                const absence: Partial<IAbsence>[] = await AbsenceModelQueries.get({
                    activityUserUuid: activityUserFkActivity.uuid
                }, {
                    justification: true,
                    acceptedJustification: true,
                });
                if (absence.length > 0) {
                    result.push({
                        name: activityUserFkActivity.name,
                        description: activityUserFkActivity.description,
                        activityKey: activityUserFkActivity.activityKey,
                        startTime: activityUserFkActivity.startTime,
                        endTime: activityUserFkActivity.endTime,
                        acceptedJustification: absence[0]?.acceptedJustification,
                        justification: absence[0]?.justification,
                    });
                }
            }

            res.status(200).send({
                code: 'OK',
                result
            });
        } catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async putMethodAbsence(req: Request, res: Response) {
        try {
            if (Object.keys(req.body).length > 0) {
                await super.checkRequestContainBothParams(req.body);

                const activity: Partial<IActivity>[] = await ActivityModelQueries.get({
                    activityKey: req.body.activityKey
                }, {
                    uuid: true,
                });

                const bearerToken: string = req.headers.authorization?.split(' ')[1] as string;
                const tokenFkUser: Partial<ITokenFKUser>[] = await TokenModelQueries.getFKUser({
                    token: bearerToken
                }, {
                    userUuid: true
                });

                const activityUser: Partial<IActivityUser>[] = await ActivityUserModelQueries.get({
                    userUuid: tokenFkUser[0]?.userUuid,
                    activityUuid: activity[0]?.uuid,
                }, {
                    uuid: true,
                });
                await AbsenceModelQueries.update({
                    justification: req.body.justification,
                }, {
                    activityUserUuid: activityUser[0]?.uuid,
                });
            } else {
                res.status(200).send({
                    code: 'OK',
                    message: 'No data to update'
                });
            }
            res.status(200).send({
                code: 'OK',
                message: 'Absence updated successfully'
            });
        } catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    private async deleteMethodAbsence(req: Request, res: Response) {
        try {
            await super.checkRequestContainBothParams(req.body);

            const activity: Partial<IActivity>[] = await ActivityModelQueries.get({
                activityKey: req.body.activityKey
            }, {
                uuid: true,
            });

            const bearerToken: string = req.headers.authorization?.split(' ')[1] as string;
            const tokenFkUser: Partial<ITokenFKUser>[] = await TokenModelQueries.getFKUser({
                token: bearerToken
            }, {
                userUuid: true
            });

            const activityUser: Partial<IActivityUser>[] = await ActivityUserModelQueries.get({
                userUuid: tokenFkUser[0]?.userUuid,
                activityUuid: activity[0]?.uuid,
            }, {
                uuid: true,
            });
            await AbsenceModelQueries.delete({
                activityUserUuid: activityUser[0]?.uuid,
            });

            res.status(200).send({
                code: 'OK',
                message: 'Absence deleted successfully'
            });
        } catch (error) {
            res.status(500).send({
                error
            });
        }
    }

    public getRouter(): IRouter {
        return this._router;
    }
}

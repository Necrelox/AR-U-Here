import {DatabaseKnex} from '../../../../DatabaseKnex';
import {Activity, User} from '../../../../../models';

export class DelayQueries {
    static getDelayByUuid(userUuid: Buffer) {
        return DatabaseKnex.getInstance().select(
            'justification','acceptedJustification', 'delayInMinutes', 'activityKey',
            'activityUserUuid', 'DELAY.uuid', 'userUuid', 'activityUuid'
            ).from('DELAY')
        .innerJoin('ACTIVITY_USER', 'DELAY.ACTIVITYUSERUUID', 'ACTIVITY_USER.UUID')
        .innerJoin('ACTIVITY', 'ACTIVITY_USER.ACTIVITYUUID', 'ACTIVITY.UUID')
        .where({userUuid});
    }
    static getDelayByActivityUuid(activityUuid: Buffer) {
        return DatabaseKnex.getInstance().select(
            'justification','acceptedJustification', 'delayInMinutes', 'username',
            'activityUserUuid', 'DELAY.uuid', 'userUuid', 'activityUuid'
            ).from('DELAY')
        .innerJoin('ACTIVITY_USER', 'DELAY.ACTIVITYUSERUUID', 'ACTIVITY_USER.UUID')
        .innerJoin('USER', 'ACTIVITY_USER.USERUUID', 'USER.UUID')
        .where({activityUuid});
    }
    static createDelay(delayReflect: Partial<Activity.IDelay>) {
        return DatabaseKnex.getInstance().insert(delayReflect).into('DELAY');
    }
    static updateDelay(delayReflect: Partial<Activity.IDelay>, activityUuid: Buffer, userUuid: Buffer) {
        return DatabaseKnex.getInstance().update(delayReflect).from('DELAY')
        .innerJoin('ACTIVITY_USER', 'DELAY.activityUserUuid', 'ACTIVITY_USER.uuid')
        .where({activityUuid, userUuid});

    }
    static deleteDelay(uuid: Buffer) {
        return DatabaseKnex.getInstance().delete().from('DELAY').where({uuid});
    }
    static deleteDelayByUserAndActivityUuid(userUuid: Buffer, activityUuid: Buffer) {
        return DatabaseKnex.getInstance().delete().from('DELAY')
        .innerJoin('ACTIVITY_USER', 'DELAY.ACTIVITYUSERUUID', 'ACTIVITY_USER.UUID')
        .where({activityUuid, userUuid});
    }
    static getUserByUserName(username: string): Promise<User.IUser[]>{
        return DatabaseKnex.getInstance().select().from('USER').where({username});
    }
    static getActivityByActivityKey(activityKey: string): Promise<Activity.IActivity[]>{
        return DatabaseKnex.getInstance().select().from('ACTIVITY').where({activityKey});
    }
    static getActivityUserByUsernameAndActivityKey(userUuid: Buffer, activityUuid: Buffer): Promise<Activity.IAbsence[]> {
        return DatabaseKnex.getInstance().select().from('ACTIVITY_USER')
        .where({userUuid, activityUuid});
    }
}

import {DatabaseKnex} from '../../../DatabaseKnex';
import {Activity} from '../../../../model';

export class DelayQueries {


    static getDelayById(userUuid: Buffer) {
        return DatabaseKnex.getInstance().select(
            'justification','acceptedJustification', 'attendedActivity', 'delayInMinutes',
            'activityUserUuid', 'DELAY.uuid', 'userUuid', 'activityUuid'
            ).into('DELAY')
        .innerJoin('ACTIVITY_USER', 'DELAY.ACTIVITYUSERUUID', 'ACTIVITY_USER.UUID')
        .where({userUuid});
    }
    static getDelayByActivityUuid(activityUuid: Buffer) {
        return DatabaseKnex.getInstance().select(
            'justification','acceptedJustification', 'attendedActivity', 'delayInMinutes',
            'activityUserUuid', 'DELAY.uuid', 'userUuid', 'activityUuid'
            ).into('DELAY')
        .innerJoin('ACTIVITY_USER', 'DELAY.ACTIVITYUSERUUID', 'ACTIVITY_USER.UUID')
        .where({activityUuid});
    }
    static createDelay(delayReflect: Partial<Activity.IDelay>) {        
        return DatabaseKnex.getInstance().insert(delayReflect).into('DELAY');
    }
    static updateDelay(delayReflect: Partial<Activity.IAbsence>, uuid: Buffer) {
        return DatabaseKnex.getInstance().update(delayReflect).from('DELAY').where({uuid});

    }
    static deleteDelay(uuid: Buffer) {
        return DatabaseKnex.getInstance().delete().from('DELAY').where({uuid});
    }
    static deleteDelayByUserAndActivityUuid(userUuid: Buffer, activityUuid: Buffer) {
        return DatabaseKnex.getInstance().delete().from('DELAY')
        .innerJoin('ACTIVITY_USER', 'DELAY.ACTIVITYUSERUUID', 'ACTIVITY_USER.UUID')
        .where({activityUuid, userUuid});
    }
}
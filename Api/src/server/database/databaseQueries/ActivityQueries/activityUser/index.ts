import {DatabaseKnex} from '../../../DatabaseKnex';
import {Activity} from '../../../../model';

export class ActivityUserQueries {

    static createActivityUser(activityUserReflect: Partial<Activity.IActivityUser>){
        return DatabaseKnex.getInstance().insert(activityUserReflect).into('ACTIVITY_USER');
    }

    static getActivityUserByUuid(uuid: Buffer) {
        return DatabaseKnex.getInstance().select().from('ACTIVITY_USER')
        .where({uuid});
    }
}
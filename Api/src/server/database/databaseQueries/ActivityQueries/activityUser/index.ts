import {DatabaseKnex} from '../../../DatabaseKnex';
import {Activity} from '../../../../model';

export class ActivityUserQueries {

    static createActivityUser(activityUserReflect: Partial<Activity.IActivityUser>){
        return DatabaseKnex.getInstance().insert(activityUserReflect).into('ACTIVITY_USER');
    }

    static getActivityUserById(uuid: Buffer) {
        return DatabaseKnex.getInstance().select().into('ACTIVITY_USER')
        .where({uuid});
    }
}

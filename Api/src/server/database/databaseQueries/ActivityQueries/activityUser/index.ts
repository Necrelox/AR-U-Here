import {DatabaseKnex} from '../../../DatabaseKnex';
import {Activity, User} from '../../../../model';

export class ActivityUserQueries {

    static createActivityUser(activityUserReflect: Partial<Activity.IActivityUser>){
        return DatabaseKnex.getInstance().insert(activityUserReflect).into('ACTIVITY_USER');
    }

    static getUserByUserName(username: string): Promise<User.IUser[]>{
        return DatabaseKnex.getInstance().select().from('USER').where({username});
    }

    static getActivityByActivityKey(activityKey: string): Promise<Activity.IActivity[]>{
        return DatabaseKnex.getInstance().select().from('ACTIVITY').where({activityKey});
    }

    static getActivityUserByUuid(uuid: Buffer) {
        return DatabaseKnex.getInstance().select().from('ACTIVITY_USER')
        .where({uuid});
    }
}
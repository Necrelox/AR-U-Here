import {DatabaseKnex} from '../../../DatabaseKnex';
import {Activity, User} from '../../../../model';

export class AbsenceQueries {

    static getAbsenceByUuid(userUuid: Buffer): Promise<Activity.IAbsenceFKActivity[]> {
        return DatabaseKnex.getInstance().select(
            'justification','acceptedJustification', 'activityKey',
            'activityUserUuid', 'ABSENCE.uuid', 'userUuid', 'activityUuid'
            ).from('ABSENCE')
        .innerJoin('ACTIVITY_USER', 'ABSENCE.ACTIVITYUSERUUID', 'ACTIVITY_USER.UUID')
        .innerJoin('ACTIVITY', 'ACTIVITY_USER.ACTIVITYUUID', 'ACTIVITY.UUID')
        .where({userUuid});
    }
    static getAbsenceByActivityUuid(activityUuid: Buffer): Promise<Activity.IAbsenceFKUser[]> {
        return DatabaseKnex.getInstance().select(
            'justification','acceptedJustification', 'username',
            'activityUserUuid', 'ABSENCE.uuid', 'userUuid', 'activityUuid'
            ).from('ABSENCE')
        .innerJoin('ACTIVITY_USER', 'ABSENCE.ACTIVITYUSERUUID', 'ACTIVITY_USER.UUID')
        .innerJoin('USER', 'ACTIVITY_USER.USERUUID', 'USER.UUID')
        .where({activityUuid});
    }
    static getActivityUserByUsernameAndActivityKey(userUuid: Buffer, activityUuid: Buffer): Promise<Activity.IAbsence[]> {
        return DatabaseKnex.getInstance().select().from('ACTIVITY_USER')
        .where({userUuid, activityUuid});
    }
    static createAbsence(absenceReflect: Partial<Activity.IAbsence>) {
        return DatabaseKnex.getInstance().insert(absenceReflect).into('ABSENCE');
    }
    static updateAbsence(absenceReflect: Partial<Activity.IAbsence>, activityUuid: Buffer, userUuid: Buffer) {
        return DatabaseKnex.getInstance().update(absenceReflect).from('ABSENCE')
        .innerJoin('ACTIVITY_USER', 'ABSENCE.activityUserUuid', 'ACTIVITY_USER.uuid')
        .where({activityUuid, userUuid});
    }
    static deleteAbsence(uuid: Buffer) {
        return DatabaseKnex.getInstance().delete().from('ABSENCE').where({uuid});
    }
    
    static getUserByUserName(username: string): Promise<User.IUser[]>{
        return DatabaseKnex.getInstance().select().from('USER').where({username});
    }

    static getActivityByActivityKey(activityKey: string): Promise<Activity.IActivity[]>{
        return DatabaseKnex.getInstance().select().from('ACTIVITY').where({activityKey});
    }

    static deleteAbsenceByUserAndActivityUuid(userUuid: Buffer, activityUuid: Buffer) {
        return DatabaseKnex.getInstance().delete().from('ABSENCE')
        .innerJoin('ACTIVITY_USER', 'ABSENCE.ACTIVITYUSERUUID', 'ACTIVITY_USER.UUID')
        .where({activityUuid, userUuid});
    }

}
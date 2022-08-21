import {DatabaseKnex} from '../../../DatabaseKnex';
import {Activity} from '../../../../model';

export class AbsenceQueries {
    
    static getAbsenceById(userUuid: Buffer): Promise<Activity.IAbsence[]> {
        return DatabaseKnex.getInstance().select(
            'justification','acceptedJustification',
            'activityUserUuid', 'ABSENCE.uuid', 'userUuid', 'activityUuid'
            ).into('ABSENCE')
        .innerJoin('ACTIVITY_USER', 'ABSENCE.ACTIVITYUSERUUID', 'ACTIVITY_USER.UUID')
        .where({userUuid});
    }
    static getAbsenceByActivityUuid(activityUuid: Buffer): Promise<Activity.IAbsence[]> {
        return DatabaseKnex.getInstance().select(
            'justification','acceptedJustification',
            'activityUserUuid', 'ABSENCE.uuid', 'userUuid', 'activityUuid'
            ).into('ABSENCE')
        .innerJoin('ACTIVITY_USER', 'ABSENCE.ACTIVITYUSERUUID', 'ACTIVITY_USER.UUID')
        .where({activityUuid});
    }
    static createAbsence(absenceReflect: Partial<Activity.IAbsence>) {
        return DatabaseKnex.getInstance().insert(absenceReflect).into('ABSENCE');
    }
    static updateAbsence(absenceReflect: Partial<Activity.IAbsence>, uuid: Buffer) {
        return DatabaseKnex.getInstance().update(absenceReflect).from('ABSENCE').where({uuid});
    }
    static deleteAbsence(uuid: Buffer) {
        return DatabaseKnex.getInstance().delete().from('ABSENCE').where({uuid});
    }

    static deleteAbsenceByUserAndActivityUuid(userUuid: Buffer, activityUuid: Buffer) {
        return DatabaseKnex.getInstance().delete().from('ABSENCE')
        .innerJoin('ACTIVITY_USER', 'ABSENCE.ACTIVITYUSERUUID', 'ACTIVITY_USER.UUID')
        .where({activityUuid, userUuid});
    }

}

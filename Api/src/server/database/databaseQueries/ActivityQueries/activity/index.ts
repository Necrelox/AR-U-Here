import {DatabaseKnex, Transaction, ErrorDatabase} from '../../../DatabaseKnex';
import {Activity} from '../../../../model';

export class ActivityQueries {

    static getAllActivities(): Promise<Activity.IActivity[]> {
        return DatabaseKnex.getInstance().select().from('ACTIVITY')
        .then((activities: Activity.IActivity[]) => {
            return activities;
        }).catch((err: ErrorDatabase) => {
            throw {
                code: err?.code,
                message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                sql: err?.sql,
            };
        });
    }

    static getActivityByUuid(activityReflectToFind: Partial<Activity.IActivity>): Promise<Activity.IActivity[]> {
        return DatabaseKnex.getInstance().select().from('ACTIVITY')
        .where(activityReflectToFind)
        .then((activities) => {
            return activities;
        }).catch((err: ErrorDatabase) => {
            throw {
                code: err?.code,
                message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                sql: err?.sql,
            };
        });
    }

    static async createActivity(activityReflect: Partial<Activity.IActivity>) {
        return (await DatabaseKnex.getInstance()).transaction(async (trx: Transaction) => {
            await ActivityQueries.addActivityTransaction(activityReflect, trx);
        }).catch((err: ErrorDatabase) => {
            const message = DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string) ?? err?.message;
            throw {
                code: err?.code,
                message,
                sql: err?.sql,
            };
        });
    }

    static updateActivity(activityUpdate: Partial<Activity.IActivity>, uuid: Buffer) {
        return DatabaseKnex.getInstance().update(activityUpdate).from('ACTIVITY').where({uuid});
    }
    static deleteActivity(uuid: Buffer) {
        return DatabaseKnex.getInstance().delete().from('ACTIVITY').where({uuid});
    }

    /** Transaction Queries */
    private static async addActivityTransaction(activityReflect: Partial<Activity.IActivity>, trx: Transaction) {
        return DatabaseKnex.getInstance().insert(activityReflect).into('ACTIVITY').transacting(trx);
    }

}
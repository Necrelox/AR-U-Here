import {DatabaseKnex, Transaction, ErrorDatabase} from '../../../DatabaseKnex';
import {Activity} from '../../../../model';

// enum CodeError {
//     GET_USER_BY_REFLECT = 'AccountQueries::createAccountTransaction',
//     SET_VERIFY_USER = 'AccountQueries::setVerifiedUser',
//     ERROR_TOKEN_NOT_FOUND = 'AccountQueries::logoutUserTransaction',
// }

// enum MessageError {
//     GET_USER_BY_REFLECT = 'User not found.',
//     SET_VERIFY_USER = 'User already verified.',
//     ERROR_TOKEN_NOT_FOUND = 'Token not found.',
// }

export class ActivityQueries {

    static getAllActivities(): Promise<Activity.IActivity[]> {
        return DatabaseKnex.getInstance().select().into('ACTIVITY')
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

    static getActivityById(activityReflectToFind: Partial<Activity.IActivity>): Promise<Activity.IActivity[]> {
        console.log(DatabaseKnex.getInstance().select().into('ACTIVITY')
        .where(activityReflectToFind).toSQL());
        return DatabaseKnex.getInstance().select().into('ACTIVITY')
        .where(activityReflectToFind)
        .then((activities) => {
            console.log(activities);
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
    

    /** Simple Queries */
    public static async getToken(activityReflectToFind: Partial<Activity.IActivity>): Promise<Activity.IActivity[]> {
        return DatabaseKnex.getInstance().select().from('Activity_TAIActivity')
            .where(activityReflectToFind)
            .then((tokens: Activity.IActivity[]) => {
                return tokens;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async getUser(userReflectToFind: Partial<Activity.IActivity>): Promise<Activity.IActivity[]> {
        return DatabaseKnex.getInstance().select().from('USER')
            .where(userReflectToFind)
            .then((users: Activity.IActivity[]) => {
                return users;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }



        /** Transaction Queries */
        private static async addActivityTransaction(activityReflect: Partial<Activity.IActivity>, trx: Transaction) {
            return DatabaseKnex.getInstance().insert(activityReflect).into('ACTIVITY').transacting(trx);
        }
        // private static async getActivityTransaction(activityReflectToFind: Partial<Activity.IActivity>, trx: Transaction): Promise<Activity.IActivity[]> {
        //     return DatabaseKnex.getInstance().select().from('ACTIVITY').where(activityReflectToFind).transacting(trx);
        // }

}

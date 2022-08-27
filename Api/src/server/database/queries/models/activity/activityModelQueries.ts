import {DatabaseKnex, ErrorDatabase, Transaction} from '../../../DatabaseKnex';
import {IActivity} from '../../../../models/'

import {transformColumnsToArray} from '../columnSelectorBuilder';

export interface IColumnsActivity {
    activityKey: boolean;
    name: boolean;
    description: boolean;
    startTime: boolean;
    endTime: boolean;
    studyLevel: boolean;
    uuid: boolean | string;
}

export const tableName = 'ACTIVITY';

export class ActivityModelQueries {
    /** SAMPLE */
    public static async get(activityReflectToFind: Partial<IActivity>, columns: Partial<IColumnsActivity>) : Promise<IActivity[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(activityReflectToFind).from(tableName)
            .then((rows: IActivity[]) => {
                return rows;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async update(activityReflectToUpdate: Partial<IActivity>, activityReflectToFind: Partial<IActivity>) {
        return DatabaseKnex.getInstance()
            .update(activityReflectToUpdate)
            .where(activityReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async create(activityReflectToCreate: Partial<IActivity>) {
        return DatabaseKnex.getInstance()
            .insert(activityReflectToCreate)
            .into(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async delete(activityReflectToFind: Partial<IActivity>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(activityReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    /** TRANSACTION */
    public static async transactionGet(activityReflectToFind: Partial<IActivity>, columns: Partial<IColumnsActivity>, trx: Transaction) : Promise<IActivity[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(activityReflectToFind).from(tableName)
            .transacting(trx);
    }

    public static async transactionUpdate(activityReflectToUpdate: Partial<IActivity>, activityReflectToFind: Partial<IActivity>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(activityReflectToUpdate)
            .where(activityReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    public static async transactionCreate(activityReflectToCreate: Partial<IActivity>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(activityReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    public static async transactionDelete(activityReflectToFind: Partial<IActivity>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(activityReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}



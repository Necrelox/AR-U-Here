import {DatabaseKnex, ErrorDatabase, Transaction} from '../../../../DatabaseKnex';
import {IDelay, IDelayFKActivityUser} from '../../../../../models/'
import {IColumnsActivityUser, tableName as activityUserTable} from '../activityUser/activityUserModelQueries';
import {transformColumnsToArray} from '../../columnSelectorBuilder';

export interface IColumnsDelay {
    delayInMinutes: boolean;
    justification: boolean;
    acceptedJustification: boolean;
    activityUserUuid: boolean;
    uuid: string | boolean;
}

export interface IColumnsDelayFKActivityUser extends IColumnsDelay, IColumnsActivityUser{}

export const tableName = 'DELAY';

export class DelayModelQueries {
    /** SAMPLE */
    public static async get(absenceReflectToFind: Partial<IDelay>, columns: Partial<IColumnsDelay>) : Promise<IDelay[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(absenceReflectToFind).from(tableName)
            .then((rows: IDelay[]) => {
                return rows;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async getFKActivityUser(absenceReflectToFind: Partial<IDelay>, columns: Partial<IColumnsDelayFKActivityUser>) : Promise<IDelayFKActivityUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(absenceReflectToFind).from(tableName)
            .join(activityUserTable, tableName + '.activityUserUuid', '=', activityUserTable + '.uuid')
            .then((rows: IDelayFKActivityUser[]) => {
                return rows;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async update(absenceReflectToUpdate: Partial<IDelay>, absenceReflectToFind: Partial<IDelay>) {
        return DatabaseKnex.getInstance()
            .update(absenceReflectToUpdate)
            .where(absenceReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async create(absenceReflectToCreate: Partial<IDelay>) {
        return DatabaseKnex.getInstance()
            .insert(absenceReflectToCreate)
            .into(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async delete(absenceReflectToFind: Partial<IDelay>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(absenceReflectToFind)
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
    public static async transactionGet(absenceReflectToFind: Partial<IDelay>, columns: Partial<IColumnsDelay>, trx: Transaction) : Promise<IDelay[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(absenceReflectToFind).from(tableName)
            .transacting(trx);
    }

    public static async transactionGetFKActivityUser(absenceReflectToFind: Partial<IDelay>, columns: Partial<IColumnsDelayFKActivityUser>, trx: Transaction) : Promise<IDelayFKActivityUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(absenceReflectToFind).from(tableName)
            .join(activityUserTable, tableName + '.activityUserUuid', '=', activityUserTable + '.uuid')
            .transacting(trx);
    }

    public static async transactionUpdate(absenceReflectToUpdate: Partial<IDelay>, absenceReflectToFind: Partial<IDelay>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(absenceReflectToUpdate)
            .where(absenceReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    public static async transactionCreate(absenceReflectToCreate: Partial<IDelay>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(absenceReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    public static async transactionDelete(absenceReflectToFind: Partial<IDelay>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(absenceReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}



import {DatabaseKnex, ErrorDatabase, Transaction} from '../../../../DatabaseKnex';
import {IHistory} from '../../../../../models/'
import {transformColumnsToArray} from '../../columnSelectorBuilder';

export interface IColumnsHistory {
    createdAt: boolean;
    isMessage: boolean;
    isAction: boolean;
    userUuid: string;
    uuid: boolean;
}

export const tableName = 'USER_HISTORY';

export class HistoryModelQueries {
    /** SAMPLE */
    public static async get(historyReflectToFind: Partial<IHistory>, columns: Partial<IColumnsHistory>) : Promise<IHistory[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(historyReflectToFind).from(tableName)
            .then((rows: IHistory[]) => {
                return rows;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async update(historyReflectToUpdate: Partial<IHistory>, historyReflectToFind: Partial<IHistory>)  {
        return DatabaseKnex.getInstance()
            .update(historyReflectToUpdate)
            .where(historyReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async create(historyReflectToCreate: Partial<IHistory>) {
        return DatabaseKnex.getInstance()
            .insert(historyReflectToCreate)
            .into(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async delete(historyReflectToFind: Partial<IHistory>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(historyReflectToFind)
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
    public static async transactionGet(historyReflectToFind: Partial<IHistory>, columns: Partial<IColumnsHistory>, trx: Transaction) : Promise<IHistory[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(historyReflectToFind).from(tableName)
            .transacting(trx);
    }

    public static async transactionUpdate(historyReflectToUpdate: Partial<IHistory>, historyReflectToFind: Partial<IHistory>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(historyReflectToUpdate)
            .where(historyReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    public static async transactionCreate(historyReflectToCreate: Partial<IHistory>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(historyReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    public static async transactionDelete(historyReflectToFind: Partial<IHistory>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(historyReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}



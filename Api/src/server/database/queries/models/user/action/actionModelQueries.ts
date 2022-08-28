import {DatabaseKnex, ErrorDatabase, Transaction} from '../../../../DatabaseKnex';
import {IAction} from '../../../../../models/'
import {transformColumnsToArray} from '../../columnSelectorBuilder';

export interface IColumnsAction {
    log: boolean;
    createdAt: boolean;
    userHistoryUuid: boolean;
    uuid: boolean;
}

export const tableName = 'USER_ACTION';

export class ActionModelQueries {
    /** SAMPLE */
    public static async get(actionReflectToFind: Partial<IAction>, columns: Partial<IColumnsAction>) : Promise<IAction[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(actionReflectToFind).from(tableName)
            .then((rows: IAction[]) => {
                return rows;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async update(actionReflectToUpdate: Partial<IAction>, actionReflectToFind: Partial<IAction>)  {
        return DatabaseKnex.getInstance()
            .update(actionReflectToUpdate)
            .where(actionReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async create(actionReflectToCreate: Partial<IAction>) {
        return DatabaseKnex.getInstance()
            .insert(actionReflectToCreate)
            .into(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async delete(actionReflectToFind: Partial<IAction>)  {
        return DatabaseKnex.getInstance()
            .delete()
            .where(actionReflectToFind)
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
    public static async transactionGet(actionReflectToFind: Partial<IAction>, columns: Partial<IColumnsAction>, trx: Transaction) : Promise<IAction[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(actionReflectToFind).from(tableName)
            .transacting(trx);
    }

    public static async transactionUpdate(actionReflectToUpdate: Partial<IAction>, actionReflectToFind: Partial<IAction>, trx: Transaction)  {
        return DatabaseKnex.getInstance()
            .update(actionReflectToUpdate)
            .where(actionReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    public static async transactionCreate(actionReflectToCreate: Partial<IAction>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(actionReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    public static async transactionDelete(actionReflectToFind: Partial<IAction>, trx: Transaction)  {
        return DatabaseKnex.getInstance()
            .delete()
            .where(actionReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}



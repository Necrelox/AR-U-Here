import {DatabaseKnex, ErrorDatabase, Transaction} from '../../../../DatabaseKnex';
import {IIP} from '../../../../../models/'
import {transformColumnsToArray} from '../../columnSelectorBuilder';

export interface IColumnsIp {
    ip: boolean;
    createdAt: boolean;
    active: boolean;
    userUuid: boolean;
    uuid: boolean;
}

export const tableName = 'USER_IP';

export class IpModelQueries {
    /** SAMPLE */
    public static async get(ipReflectToFind: Partial<IIP>, columns: Partial<IColumnsIp>) : Promise<IIP[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(ipReflectToFind).from(tableName)
            .then((rows: IIP[]) => {
                return rows;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async update(ipReflectToUpdate: Partial<IIP>, ipReflectToFind: Partial<IIP>) {
        return DatabaseKnex.getInstance()
            .update(ipReflectToUpdate)
            .where(ipReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async create(ipReflectToCreate: Partial<IIP>) {
        return DatabaseKnex.getInstance()
            .insert(ipReflectToCreate)
            .into(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async delete(ipReflectToFind: Partial<IIP>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(ipReflectToFind)
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
    public static async transactionGet(ipReflectToFind: Partial<IIP>, columns: Partial<IColumnsIp>, trx: Transaction) : Promise<IIP[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(ipReflectToFind).from(tableName)
            .transacting(trx);
    }

    public static async transactionUpdate(ipReflectToUpdate: Partial<IIP>, ipReflectToFind: Partial<IIP>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(ipReflectToUpdate)
            .where(ipReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    public static async transactionCreate(ipReflectToCreate: Partial<IIP>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(ipReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    public static async transactionDelete(ipReflectToFind: Partial<IIP>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(ipReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}



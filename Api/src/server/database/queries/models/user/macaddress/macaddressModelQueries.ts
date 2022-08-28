import {DatabaseKnex, ErrorDatabase, Transaction} from '../../../../DatabaseKnex';
import {IMacAddress} from '../../../../../models/'
import {transformColumnsToArray} from '../../columnSelectorBuilder';

export interface IColumnsMacAddress {
    macAddress: boolean;
    createdAt: boolean;
    active: boolean;
    userUuid: boolean;
    uuid: boolean;
}

export const tableName = 'USER_MACADDRESS';

export class MacAddressModelQueries {
    /** SAMPLE */
    public static async get(macAddressReflectToFind: Partial<IMacAddress>, columns: Partial<IColumnsMacAddress>) : Promise<IMacAddress[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(macAddressReflectToFind).from(tableName)
            .then((rows: IMacAddress[]) => {
                return rows;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async update(macAddressReflectToUpdate: Partial<IMacAddress>, macAddressReflectToFind: Partial<IMacAddress>) {
        return DatabaseKnex.getInstance()
            .update(macAddressReflectToUpdate)
            .where(macAddressReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async create(macAddressReflectToCreate: Partial<IMacAddress>) {
        return DatabaseKnex.getInstance()
            .insert(macAddressReflectToCreate)
            .into(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async delete(macAddressReflectToFind: Partial<IMacAddress>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(macAddressReflectToFind)
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
    public static async transactionGet(macAddressReflectToFind: Partial<IMacAddress>, columns: Partial<IColumnsMacAddress>, trx: Transaction) : Promise<IMacAddress[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(macAddressReflectToFind).from(tableName)
            .transacting(trx);
    }

    public static async transactionUpdate(macAddressReflectToUpdate: Partial<IMacAddress>, macAddressReflectToFind: Partial<IMacAddress>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(macAddressReflectToUpdate)
            .where(macAddressReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    public static async transactionCreate(macAddressReflectToCreate: Partial<IMacAddress>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(macAddressReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    public static async transactionDelete(macAddressReflectToFind: Partial<IMacAddress>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(macAddressReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}



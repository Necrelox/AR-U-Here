import {DatabaseKnex, ErrorDatabase, Transaction} from '../../../../DatabaseKnex';
import {IDevice} from '../../../../../models/'
import {transformColumnsToArray} from '../../columnSelectorBuilder';

export interface IColumnsDevice {
    device: boolean;
    createdAt: boolean;
    active: boolean;
    userUuid: boolean;
    uuid: boolean;
}

export const tableName = 'USER_DEVICE';

export class DeviceModelQueries {
    /** SAMPLE */
    public static async get(deviceReflectToFind: Partial<IDevice>, columns: Partial<IColumnsDevice>) : Promise<IDevice[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(deviceReflectToFind).from(tableName)
            .then((rows: IDevice[]) => {
                return rows;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async update(deviceReflectToUpdate: Partial<IDevice>, deviceReflectToFind: Partial<IDevice>) {
        DatabaseKnex.getInstance()
            .update(deviceReflectToUpdate)
            .where(deviceReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async create(deviceReflectToCreate: Partial<IDevice>) {
        return DatabaseKnex.getInstance()
            .insert(deviceReflectToCreate)
            .into(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async delete(deviceReflectToFind: Partial<IDevice>) {
        DatabaseKnex.getInstance()
            .delete()
            .where(deviceReflectToFind)
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
    public static async transactionGet(deviceReflectToFind: Partial<IDevice>, columns: Partial<IColumnsDevice>, trx: Transaction) : Promise<IDevice[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(deviceReflectToFind).from(tableName)
            .transacting(trx);
    }

    public static async transactionUpdate(deviceReflectToUpdate: Partial<IDevice>, deviceReflectToFind: Partial<IDevice>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(deviceReflectToUpdate)
            .where(deviceReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    public static async transactionCreate(deviceReflectToCreate: Partial<IDevice>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(deviceReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    public static async transactionDelete(deviceReflectToFind: Partial<IDevice>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(deviceReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}



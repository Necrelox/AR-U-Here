import {DatabaseKnex, ErrorDatabase, Transaction} from '../../../DatabaseKnex';
import {IUser} from '../../../../models/'

import {transformColumnsToArray} from '../columnSelectorBuilder';

export interface IColumnsUser {
    email: boolean;
    username: boolean;
    password: boolean;
    activityMessage: boolean;
    isVerified: boolean;
    role: boolean;
    address: boolean;
    phone: boolean;
    isConnected: boolean;
    isBlackListed: boolean;
    userCreatedAt: boolean;
    uuid: boolean | string;
}

export const tableName = 'USER';

export class UserModelQueries {
    /** SAMPLE */
    public static async get(userReflectToFind: Partial<IUser>, columns: Partial<IColumnsUser>) : Promise<IUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(userReflectToFind).from(tableName)
            .then((rows: IUser[]) => {
                return rows;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async update(userReflectToUpdate: Partial<IUser>, userReflectToFind: Partial<IUser>) {
        return DatabaseKnex.getInstance()
            .update(userReflectToUpdate)
            .where(userReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async create(userReflectToCreate: Partial<IUser>) {
        return DatabaseKnex.getInstance()
            .insert(userReflectToCreate)
            .into(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async delete(userReflectToFind: Partial<IUser>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(userReflectToFind)
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
    public static async transactionGet(userReflectToFind: Partial<IUser>, columns: Partial<IColumnsUser>, trx: Transaction) : Promise<IUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(userReflectToFind).from(tableName)
            .transacting(trx);
    }

    public static async transactionUpdate(userReflectToUpdate: Partial<IUser>, userReflectToFind: Partial<IUser>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(userReflectToUpdate)
            .into(tableName)
            .where(userReflectToFind)
            .transacting(trx);
    }

    public static async transactionCreate(userReflectToCreate: Partial<IUser>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(userReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    public static async transactionDelete(userReflectToFind: Partial<IUser>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(userReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

}



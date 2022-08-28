import {DatabaseKnex, ErrorDatabase, Transaction} from '../../../../DatabaseKnex';
import {IToken, ITokenFKUser} from '../../../../../models/'
import {IColumnsUser, tableName as userTable} from '../userModelQueries';
import {transformColumnsToArray} from '../../columnSelectorBuilder';

export interface IColumnsToken {
    createdAt: boolean;
    expireAt: boolean;
    token: boolean;
    userUuid: boolean;
    uuid: string | boolean;
}

export interface IColumnsTokenFKUser extends IColumnsToken, IColumnsUser{}

export const tableName = 'USER_TOKEN';

export class TokenModelQueries {
    /** SAMPLE */
    public static async get(tokenReflectToFind: Partial<IToken>, columns: Partial<IColumnsToken>) : Promise<IToken[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(tokenReflectToFind).from(tableName)
            .then((rows: IToken[]) => {
                return rows;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async getFKUser(tokenReflectToFind: Partial<IToken>, columns: Partial<IColumnsTokenFKUser>) : Promise<ITokenFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(tokenReflectToFind).from(tableName)
            .join(userTable, tableName + '.userUuid', '=', userTable + '.uuid')
            .then((rows: ITokenFKUser[]) => {
                return rows;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async update(tokenReflectToUpdate: Partial<IToken>, tokenReflectToFind: Partial<IToken>) {
        return DatabaseKnex.getInstance()
            .update(tokenReflectToUpdate)
            .where(tokenReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async create(tokenReflectToCreate: Partial<IToken>) {
        return DatabaseKnex.getInstance()
            .insert(tokenReflectToCreate)
            .into(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async delete(tokenReflectToFind: Partial<IToken>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(tokenReflectToFind)
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

    public static async transactionGet(tokenReflectToFind: Partial<IToken>, columns: Partial<IColumnsToken>, trx: Transaction) : Promise<IToken[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(tokenReflectToFind).from(tableName)
            .transacting(trx);
    }

    public static async transactionGetFKUser(tokenReflectToFind: Partial<IToken>, columns: Partial<IColumnsTokenFKUser>, trx: Transaction) : Promise<ITokenFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(tokenReflectToFind).from(tableName)
            .join(userTable, tableName + '.userUuid', '=', userTable + '.uuid')
            .transacting(trx);
    }

    public static async transactionUpdate(tokenReflectToUpdate: Partial<IToken>, tokenReflectToFind: Partial<IToken>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(tokenReflectToUpdate)
            .where(tokenReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    public static async transactionCreate(tokenReflectToCreate: Partial<IToken>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(tokenReflectToCreate)
            .into(tableName)
            .transacting(trx)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async transactionDelete(tokenReflectToFind: Partial<IToken>, trx: Transaction)  {
        return DatabaseKnex.getInstance()
            .delete()
            .where(tokenReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}



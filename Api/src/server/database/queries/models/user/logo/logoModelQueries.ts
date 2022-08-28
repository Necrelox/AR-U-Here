import {DatabaseKnex, ErrorDatabase, Transaction} from '../../../../DatabaseKnex';
import {ILogo} from '../../../../../models/'
import {transformColumnsToArray} from '../../columnSelectorBuilder';

export interface IColumnsLogo {
    path: boolean;
    createdAt: boolean;
    seed: boolean;
    sizeMo: boolean;
    active: boolean;
    userUuid: boolean;
    uuid: boolean;
}

export const tableName = 'USER_LOGO';

export class LogoModelQueries {
    /** SAMPLE */
    public static async get(logoReflectToFind: Partial<ILogo>, columns: Partial<IColumnsLogo>) : Promise<ILogo[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(logoReflectToFind).from(tableName)
            .then((rows: ILogo[]) => {
                return rows;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async update(logoReflectToUpdate: Partial<ILogo>, logoReflectToFind: Partial<ILogo>) {
        return DatabaseKnex.getInstance()
            .update(logoReflectToUpdate)
            .where(logoReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async create(logoReflectToCreate: Partial<ILogo>) {
        return DatabaseKnex.getInstance()
            .insert(logoReflectToCreate)
            .into(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async delete(logoReflectToFind: Partial<ILogo>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(logoReflectToFind)
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
    public static async transactionGet(logoReflectToFind: Partial<ILogo>, columns: Partial<IColumnsLogo>, trx: Transaction) : Promise<ILogo[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(logoReflectToFind).from(tableName)
            .transacting(trx);
    }

    public static async transactionUpdate(logoReflectToUpdate: Partial<ILogo>, logoReflectToFind: Partial<ILogo>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(logoReflectToUpdate)
            .where(logoReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    public static async transactionCreate(logoReflectToCreate: Partial<ILogo>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(logoReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    public static async transactionDelete(logoReflectToFind: Partial<ILogo>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(logoReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}



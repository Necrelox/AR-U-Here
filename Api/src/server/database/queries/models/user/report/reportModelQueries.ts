import {DatabaseKnex, ErrorDatabase, Transaction} from '../../../../DatabaseKnex';
import {IReport} from '../../../../../models/'
import {transformColumnsToArray} from '../../columnSelectorBuilder';

export interface IColumnsReport {
    createdAt: boolean;
    reason: boolean;
    userSendReport: boolean;
    userReported: boolean;
    uuid: boolean;
}

export const tableName = 'USER_REPORT';

export class ReportModelQueries {
    /** SAMPLE */
    public static async get(reportReflectToFind: Partial<IReport>, columns: Partial<IColumnsReport>) : Promise<IReport[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(reportReflectToFind).from(tableName)
            .then((rows: IReport[]) => {
                return rows;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async update(reportReflectToUpdate: Partial<IReport>, reportReflectToFind: Partial<IReport>) {
        return DatabaseKnex.getInstance()
            .update(reportReflectToUpdate)
            .where(reportReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async create(reportReflectToCreate: Partial<IReport>) {
        return DatabaseKnex.getInstance()
            .insert(reportReflectToCreate)
            .into(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async delete(reportReflectToFind: Partial<IReport>) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(reportReflectToFind)
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
    public static async transactionGet(reportReflectToFind: Partial<IReport>, columns: Partial<IColumnsReport>, trx: Transaction) : Promise<IReport[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(reportReflectToFind).from(tableName)
            .transacting(trx);
    }

    public static async transactionUpdate(reportReflectToUpdate: Partial<IReport>, reportReflectToFind: Partial<IReport>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(reportReflectToUpdate)
            .where(reportReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    public static async transactionCreate(reportReflectToCreate: Partial<IReport>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(reportReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    public static async transactionDelete(reportReflectToFind: Partial<IReport>, trx: Transaction)  {
        return DatabaseKnex.getInstance()
            .delete()
            .where(reportReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}



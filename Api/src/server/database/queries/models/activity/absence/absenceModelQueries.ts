import {DatabaseKnex, ErrorDatabase, Transaction} from '../../../../DatabaseKnex';
import {IAbsence, IAbsenceFKActivityUser} from '../../../../../models/'
import {IColumnsActivityUser, tableName as activityUserTable} from '../activityUser/activityUserModelQueries';
import {transformColumnsToArray} from '../../columnSelectorBuilder';

export interface IColumnsAbsence {
    justification: boolean;
    acceptedJustification: boolean;
    activityUserUuid: boolean;
    uuid: string | boolean;
}

export interface IColumnsAbsenceFKActivityUser extends IColumnsAbsence, IColumnsActivityUser{}

export const tableName = 'ABSENCE';

export class AbsenceModelQueries {
    /** SAMPLE */
    public static async get(absenceReflectToFind: Partial<IAbsence>, columns: Partial<IColumnsAbsence>) : Promise<IAbsence[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(absenceReflectToFind).from(tableName)
            .then((rows: IAbsence[]) => {
                return rows;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async getFKActivityUser(absenceReflectToFind: Partial<IAbsence>, columns: Partial<IColumnsAbsenceFKActivityUser>) : Promise<IAbsenceFKActivityUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(absenceReflectToFind).from(tableName)
            .join(activityUserTable, tableName + '.activityUserUuid', '=', activityUserTable + '.uuid')
            .then((rows: IAbsenceFKActivityUser[]) => {
                return rows;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async update(absenceReflectToUpdate: Partial<IAbsence>, absenceReflectToFind: Partial<IAbsence>) {
        DatabaseKnex.getInstance()
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

    public static async create(absenceReflectToCreate: Partial<IAbsence>) {
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

    public static async delete(absenceReflectToFind: Partial<IAbsence>) {
        DatabaseKnex.getInstance()
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
    public static async transactionGet(absenceReflectToFind: Partial<IAbsence>, columns: Partial<IColumnsAbsence>, trx: Transaction) : Promise<IAbsence[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(absenceReflectToFind).from(tableName)
            .transacting(trx);
    }

    public static async transactionGetFKActivityUser(absenceReflectToFind: Partial<IAbsence>, columns: Partial<IColumnsAbsenceFKActivityUser>, trx: Transaction) : Promise<IAbsenceFKActivityUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(absenceReflectToFind).from(tableName)
            .join(activityUserTable, tableName + '.activityUserUuid', '=', activityUserTable + '.uuid')
            .transacting(trx);
    }

    public static async transactionUpdate(absenceReflectToUpdate: Partial<IAbsence>, absenceReflectToFind: Partial<IAbsence>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(absenceReflectToUpdate)
            .where(absenceReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    public static async transactionCreate(absenceReflectToCreate: Partial<IAbsence>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(absenceReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    public static async transactionDelete(absenceReflectToFind: Partial<IAbsence>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(absenceReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}



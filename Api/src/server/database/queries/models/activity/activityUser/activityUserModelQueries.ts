import {DatabaseKnex, ErrorDatabase, Transaction} from '../../../../DatabaseKnex';
import {IActivityUser, IActivityUserFKUser, IActivityUserFKActivity, IActivityUserFKUserAndActivity} from '../../../../../models/'
import {IColumnsActivity, tableName as activityTable} from '../activityModelQueries';
import {IColumnsUser, tableName as userTable} from '../../user/userModelQueries';
import {transformColumnsToArray} from '../../columnSelectorBuilder';

export interface IColumnsActivityUser {
    activityUuid: boolean;
    userUuid: boolean;
    uuid: string | boolean;
}

export interface IColumnsActivityUserFKActivity extends IColumnsActivityUser, IColumnsActivity{}
export interface IColumnsActivityUserFKUser extends IColumnsActivityUser, IColumnsUser{}
export interface IColumnsActivityUserFKUserAndActivity extends IColumnsActivityUser, IColumnsUser, IColumnsActivity{}

export const tableName = 'ACTIVITY_USER';

export class ActivityUserModelQueries {
    /**  SAMPLE */
    public static async get(absenceReflectToFind: Partial<IActivityUser>, columns: Partial<IColumnsActivityUser>) : Promise<IActivityUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(absenceReflectToFind).from(tableName)
            .then((rows: IActivityUser[]) => {
                return rows;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async getFKActivity(absenceReflectToFind: Partial<IActivityUser>, columns: Partial<IColumnsActivityUserFKActivity>) : Promise<IActivityUserFKActivity[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(absenceReflectToFind).from(tableName)
            .join(activityTable, tableName + '.activityUuid', '=', activityTable + '.uuid')
            .then((rows: IActivityUserFKActivity[]) => {
                return rows;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async getFKUser(absenceReflectToFind: Partial<IActivityUser>, columns: Partial<IColumnsActivityUserFKUser>) : Promise<IActivityUserFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(absenceReflectToFind).from(tableName)
            .join(userTable, tableName + '.userUuid', '=', userTable + '.uuid')
            .then((rows: IActivityUserFKUser[]) => {
                return rows;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async getFKUserAndActivity(absenceReflectToFind: Partial<IActivityUser>, columns: Partial<IColumnsActivityUserFKUserAndActivity>) : Promise<IActivityUserFKUserAndActivity[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(absenceReflectToFind).from(tableName)
            .join(activityTable, tableName + '.activityUuid', '=', activityTable + '.uuid')
            .join(userTable, tableName + '.userUuid', '=', userTable + '.uuid')
            .then((rows: IActivityUserFKUserAndActivity[]) => {
                return rows;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async update(absenceReflectToUpdate: Partial<IActivityUser>, absenceReflectToFind: Partial<IActivityUser>) {
        return DatabaseKnex.getInstance()
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

    public static async create(absenceReflectToCreate: Partial<IActivityUser>) {
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

    public static async delete(absenceReflectToFind: Partial<IActivityUser>) {
        return DatabaseKnex.getInstance()
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
    public static async transactionGet(absenceReflectToFind: Partial<IActivityUser>, columns: Partial<IColumnsActivityUser>, trx: Transaction) : Promise<IActivityUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(absenceReflectToFind).from(tableName)
            .transacting(trx);
    }

    public static async transactionGetFKActivity(absenceReflectToFind: Partial<IActivityUser>, columns: Partial<IColumnsActivityUserFKActivity>, trx: Transaction) : Promise<IActivityUserFKActivity[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(absenceReflectToFind).from(tableName)
            .join(activityTable, tableName + '.activityUuid', '=', activityTable + '.uuid')
            .transacting(trx);
    }

    public static async transactionGetFKUser(absenceReflectToFind: Partial<IActivityUser>, columns: Partial<IColumnsActivityUserFKUser>, trx: Transaction) : Promise<IActivityUserFKUser[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(absenceReflectToFind).from(tableName)
            .join(userTable, tableName + '.userUuid', '=', userTable + '.uuid')
            .transacting(trx);
    }

    public static async transactionGetFKUserAndActivity(absenceReflectToFind: Partial<IActivityUser>, columns: Partial<IColumnsActivityUserFKUserAndActivity>, trx: Transaction) : Promise<IActivityUserFKUserAndActivity[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(absenceReflectToFind).from(tableName)
            .join(activityTable, tableName + '.activityUuid', '=', activityTable + '.uuid')
            .join(userTable, tableName + '.userUuid', '=', userTable + '.uuid')
            .transacting(trx);
    }

    public static async transactionUpdate(absenceReflectToUpdate: Partial<IActivityUser>, absenceReflectToFind: Partial<IActivityUser>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(absenceReflectToUpdate)
            .where(absenceReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    public static async transactionCreate(absenceReflectToCreate: Partial<IActivityUser>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(absenceReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    public static async transactionDelete(absenceReflectToFind: Partial<IActivityUser>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(absenceReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}



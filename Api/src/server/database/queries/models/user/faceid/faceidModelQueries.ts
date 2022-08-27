import {DatabaseKnex, ErrorDatabase, Transaction} from '../../../../DatabaseKnex';
import {IFaceId} from '../../../../../models/'
import {transformColumnsToArray} from '../../columnSelectorBuilder';

export interface IColumnsFaceId {
    path: boolean;
    createdAt: boolean;
    userUuid: boolean;
    uuid: boolean;
}

export const tableName = 'USER_FACE_ID';

export class FaceIdModelQueries {
    /** SAMPLE */
    public static async get(faceIdReflectToFind: Partial<IFaceId>, columns: Partial<IColumnsFaceId>) : Promise<IFaceId[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(faceIdReflectToFind).from(tableName)
            .then((rows: IFaceId[]) => {
                return rows;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async update(faceIdReflectToUpdate: Partial<IFaceId>, faceIdReflectToFind: Partial<IFaceId>) {
        DatabaseKnex.getInstance()
            .update(faceIdReflectToUpdate)
            .where(faceIdReflectToFind)
            .from(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async create(faceIdReflectToCreate: Partial<IFaceId>) {
        return DatabaseKnex.getInstance()
            .insert(faceIdReflectToCreate)
            .into(tableName)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async delete(faceIdReflectToFind: Partial<IFaceId>) {
        DatabaseKnex.getInstance()
            .delete()
            .where(faceIdReflectToFind)
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
    public static async transactionGet(faceIdReflectToFind: Partial<IFaceId>, columns: Partial<IColumnsFaceId>, trx: Transaction) : Promise<IFaceId[]> {
        return DatabaseKnex.getInstance()
            .select(transformColumnsToArray(columns))
            .where(faceIdReflectToFind).from(tableName)
            .transacting(trx);
    }

    public static async transactionUpdate(faceIdReflectToUpdate: Partial<IFaceId>, faceIdReflectToFind: Partial<IFaceId>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .update(faceIdReflectToUpdate)
            .where(faceIdReflectToFind)
            .from(tableName)
            .transacting(trx);
    }

    public static async transactionCreate(faceIdReflectToCreate: Partial<IFaceId>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .insert(faceIdReflectToCreate)
            .into(tableName)
            .transacting(trx);
    }

    public static async transactionDelete(faceIdReflectToFind: Partial<IFaceId>, trx: Transaction) {
        return DatabaseKnex.getInstance()
            .delete()
            .where(faceIdReflectToFind)
            .from(tableName)
            .transacting(trx);
    }
}



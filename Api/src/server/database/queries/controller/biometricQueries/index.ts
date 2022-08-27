import {DatabaseKnex, ErrorDatabase} from '../../../DatabaseKnex';
import {User} from '../../../../models';

export class BiometricQueries {

    public static async deleteBiometric(biometricReflectToFind: Partial<User.IFaceId>) : Promise<number> {
        return DatabaseKnex.getInstance().delete().from('USER_FACE_ID').where(biometricReflectToFind)
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async getBiometric(biometricReflectToFind: Partial<User.IFaceId>): Promise<User.IFaceId[]> {
        return DatabaseKnex.getInstance().select().from('USER_FACE_ID').where(biometricReflectToFind)
            .then((biometric: User.IFaceId[]) => {
                return biometric;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async addBiometric(biometric: Partial<User.IFaceId>) {
        return DatabaseKnex.getInstance().insert(biometric).into('USER_FACE_ID').catch((err: ErrorDatabase) => {
            throw {
                code: err?.code,
                message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                sql: err?.sql,
            };
        });
    }
}

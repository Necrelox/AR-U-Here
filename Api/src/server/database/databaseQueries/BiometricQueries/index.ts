import {DatabaseKnex, ErrorDatabase} from '../../DatabaseKnex';
import {User} from '../../../model';

export class BiometricQueries {
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

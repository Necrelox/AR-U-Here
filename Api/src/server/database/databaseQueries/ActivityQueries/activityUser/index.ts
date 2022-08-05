import {DatabaseKnex, ErrorDatabase} from '../../../DatabaseKnex';
import {User} from '../../../../model';

export class ActivityUserQueries {

    
    static getActivityByUserId(id: string | undefined) {
        console.log(id);
        throw new Error('Method not implemented.');
    }
    static getUserByActivityId(id: string | undefined) {
        console.log(id);
        throw new Error('Method not implemented.');
    }
    static getDelayByActivityId(id: string | undefined) {
        console.log(id);
        throw new Error('Method not implemented.');
    }
    static getDelayByUserId(id: string | undefined) {
        console.log(id);
        throw new Error('Method not implemented.');
    }
    static getAbsenceByActivityId(id: string | undefined) {
        console.log(id);
        throw new Error('Method not implemented.');
    }
    static getAbsenceByUserId(id: string | undefined) {
        console.log(id);
        throw new Error('Method not implemented.');
    }

    /** Simple Queries */
    public static async getToken(tokenReflectToFind: Partial<User.IToken>): Promise<User.IToken[]> {
        return DatabaseKnex.getInstance().select().from('USER_TOKEN')
            .where(tokenReflectToFind)
            .then((tokens: User.IToken[]) => {
                return tokens;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async getUser(userReflectToFind: Partial<User.IUser>): Promise<User.IUser[]> {
        return DatabaseKnex.getInstance().select().from('USER')
            .where(userReflectToFind)
            .then((users: User.IUser[]) => {
                return users;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }


}

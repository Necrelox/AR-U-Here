import {DatabaseKnex, ErrorDatabase} from '../../../DatabaseKnex';
import {User} from '../../../../model';

export class ActivityQueries {
    static getAllActivities() {
        throw new Error('Method not implemented.');
    }
    static getActivityById(id: string | undefined) {
        console.log(id);
        throw new Error('Method not implemented.');
    }
    static createActivity(body: any) {
        console.log(body);
        throw new Error('Method not implemented.');
    }
    static updateActivity(body: any) {
        console.log(body);
        throw new Error('Method not implemented.');
    }
    static deleteActivity(id: string | undefined) {
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

import {DatabaseKnex, Transaction, ErrorDatabase} from '../../DatabaseKnex';
import {User} from '../../../model';

enum CodeError {
    UPDATE_USER_TRANSACTION = 'UserQueries::updateUserTransaction',
}

enum MessageError {
    NO_USER_FOUND_BY_TOKEN = 'No user found by token.',
}

export class UserQueries {
    /** Simple Queries */
    public static async getUserByFKToken(token: Partial<User.IToken>): Promise<User.ITokenFKUser[]> {
        return DatabaseKnex.getInstance().select().from('USER_TOKEN')
            .where(token)
            .join('USER', 'USER.uuid', '=', 'USER_TOKEN.userUuid')
            .then((tokens: User.ITokenFKUser[]) => {
                return tokens;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }
    
    public static async getUserByEmail(email: string): Promise<User.IUser[]> {
        console.log(email);
        return DatabaseKnex.getInstance().select().from('USER')
            .where({email})
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async deleteToken(token: Partial<User.IToken>) {
        return DatabaseKnex.getInstance().delete().from('USER_TOKEN').where(token);
    }

    public static async addToken(token: Partial<User.IToken>) {
        return DatabaseKnex.getInstance().insert(token).into('USER_TOKEN');
    }

    /** Transaction Queries */
    private static async deleteTokenTransaction(where: Partial<User.IToken>, trx: Transaction) {
        return DatabaseKnex.getInstance().delete().from('USER_TOKEN').where(where).transacting(trx);
    }

    private static async getUserByFKTokenTransaction(token: Partial<User.IToken>, trx: Transaction): Promise<User.ITokenFKUser[]> {
        return DatabaseKnex.getInstance().select().from('USER_TOKEN')
            .join('USER', 'USER.uuid', '=', 'USER_TOKEN.userUuid')
            .where(token)
            .transacting(trx);
    }

    private static async updateUserTransaction(userReflect: Partial<User.IUser>, where: Partial<User.IUser>, trx: Transaction) {
        return DatabaseKnex.getInstance().update(userReflect).into('USER').where(where).transacting(trx);
    }

    private static async updateDeviceTransaction(deviceReflect: Partial<User.IDevice>, deviceReflectToFind: Partial<User.IDevice>, trx: Transaction) {
        return DatabaseKnex.getInstance().update(deviceReflect).where(deviceReflectToFind).into('USER_DEVICE').transacting(trx);
    }

    private static async updateMacAddressTransaction(macAddressReflect: Partial<User.IMacAddress>, macAddressReflectToFind: Partial<User.IMacAddress>, trx: Transaction) {
        return DatabaseKnex.getInstance().update(macAddressReflect).where(macAddressReflectToFind).into('USER_MACADDRESS').transacting(trx);
    }

    private static async updateIpTransaction(ipReflect: Partial<User.IIP>, ipReflectToFind: Partial<User.IIP>, trx: Transaction) {
        return DatabaseKnex.getInstance().update(ipReflect).where(ipReflectToFind).into('USER_IP').transacting(trx);
    }

    public static async updateUserByTokenTransaction(userUpdate: Partial<User.IUser>, tokenForSearch: Partial<User.IToken>) {
        const knex = await DatabaseKnex.getInstance();
        return knex.transaction(async (trx: Transaction) => {

            const tokenFKUsers: User.ITokenFKUser[] = await UserQueries.getUserByFKTokenTransaction(tokenForSearch, trx);
            if (tokenFKUsers.length === 0) {
                throw {
                    code: CodeError.UPDATE_USER_TRANSACTION,
                    message: MessageError.NO_USER_FOUND_BY_TOKEN,
                };
            }
            if ('password' in userUpdate) {
                await UserQueries.deleteTokenTransaction({
                    token: tokenFKUsers[0]?.token,
                    userUuid: tokenFKUsers[0]?.userUuid,
                }, trx);
                await Promise.all([
                    UserQueries.updateUserTransaction({isConnected: false}, {uuid: tokenFKUsers[0]?.userUuid}, trx),
                    UserQueries.updateIpTransaction({active: false}, {
                        userUuid: tokenFKUsers[0]?.userUuid,
                        active: true,
                    }, trx),
                    UserQueries.updateDeviceTransaction({active: false}, {
                        userUuid: tokenFKUsers[0]?.userUuid,
                        active: true,
                    }, trx),
                    UserQueries.updateMacAddressTransaction({active: false}, {
                        userUuid: tokenFKUsers[0]?.userUuid,
                        active: true,
                    }, trx),
                    UserQueries.deleteTokenTransaction({
                        userUuid: tokenFKUsers[0]?.userUuid
                    }, trx)
                ]);
            }
            await UserQueries.updateUserTransaction(userUpdate, {
                uuid: (tokenFKUsers[0] as User.ITokenFKUser).userUuid,
            }, trx);
        })
            .catch((err: ErrorDatabase) => {
                const message = DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string) ?? err?.message;
                throw {
                    code: err?.code,
                    message,
                    sql: err?.sql,
                };
            });
    }
}

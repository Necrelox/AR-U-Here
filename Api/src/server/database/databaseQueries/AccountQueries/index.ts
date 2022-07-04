import {DatabaseKnex, Transaction, ErrorDatabase} from '../../../database/DatabaseKnex';
import {User} from '../../../model';
import * as Tools from '../../../tools';

enum CodeError {
    GET_USER_BY_REFLECT = 'AccountQueries::createAccountTransaction',
    SET_VERIFY_USER = 'AccountQueries::setVerifiedUser',
}

enum MessageError {
    GET_USER_BY_REFLECT = 'User not found.',
    SET_VERIFY_USER = 'User already verified.',
}

export class AccountQueries {

    /** Sample Queries */
    public static async getToken(tokenReflect: User.IToken): Promise<User.IToken[]> {
        return DatabaseKnex.getInstance().select().from('USER_TOKEN')
            .where(tokenReflect)
            .then((tokens: User.IToken[]) => {
                return tokens;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                };
            });
    }

    public static async getUser(userReflect: User.IUser): Promise<User.IUser[]> {
        return DatabaseKnex.getInstance().select().from('USER')
            .where(userReflect)
            .then((users: User.IUser[]) => {
                return users;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                };
            });
    }

    /** Transaction Queries */
    private static async addUserTransaction(user: User.IUser, trx: Transaction) {
        return DatabaseKnex.getInstance().insert(user).into('USER').transacting(trx);
    }

    private static async updateUserTransaction(userReflect: User.IUser, where: User.IUser, trx: Transaction) {
        return DatabaseKnex.getInstance().update(userReflect).into('USER').where(where).transacting(trx);
    }

    private static async getUserTransaction(where: User.IUser, trx: Transaction): Promise<User.IUser[]> {
        return DatabaseKnex.getInstance().select().from('USER').where(where).transacting(trx);
    }

    private static async getTokenTransaction(where: User.IToken, trx: Transaction): Promise<User.IToken[]> {
        return DatabaseKnex.getInstance().select().from('USER_TOKEN').where(where).transacting(trx);
    }

    private static async deleteTokenTransaction(where: User.IToken, trx: Transaction) {
        return DatabaseKnex.getInstance().delete().from('USER_TOKEN').where(where).transacting(trx);
    }

    private static async addTokenTransaction(tokenReflect: User.IToken, trx: Transaction) {
        return DatabaseKnex.getInstance().insert(tokenReflect).into('USER_TOKEN').transacting(trx);
    }

    private static async addIpTransaction(ip: User.IIP, trx: Transaction) {
        return DatabaseKnex.getInstance().insert(ip).into('USER_IP').transacting(trx);
    }

    private static async getIpTransaction(where: User.IIP, trx: Transaction): Promise<User.IIP[]> {
        return DatabaseKnex.getInstance().select().from('USER_IP').where(where).transacting(trx);
    }

    private static async updateIpTransaction(ip: User.IIP, trx: Transaction) {
        return DatabaseKnex.getInstance().update(ip).into('USER_IP').transacting(trx);
    }

    private static async addMacAddressTransaction(macAddress: User.IMacAddress, trx: Transaction) {
        return DatabaseKnex.getInstance().insert(macAddress).into('USER_MACADDRESS').transacting(trx);
    }

    private static async getMacAddressTransaction(where: User.IMacAddress, trx: Transaction): Promise<User.IMacAddress[]> {
        return DatabaseKnex.getInstance().select().from('USER_MACADDRESS').where(where).transacting(trx);
    }

    private static async updateMacAddressTransaction(macAddress: User.IMacAddress, trx: Transaction) {
        return DatabaseKnex.getInstance().update(macAddress).into('USER_MACADDRESS').transacting(trx);
    }

    private static async addDeviceTransaction(device: User.IDevice, trx: Transaction) {
        return DatabaseKnex.getInstance().insert(device).into('USER_DEVICE').transacting(trx);
    }

    private static async getDeviceTransaction(where: User.IDevice, trx: Transaction): Promise<User.IDevice[]> {
        return DatabaseKnex.getInstance().select().from('USER_DEVICE').where(where).transacting(trx);
    }

    private static async updateDeviceTransaction(device: User.IDevice, trx: Transaction) {
        return DatabaseKnex.getInstance().update(device).into('USER_DEVICE').transacting(trx);
    }

    private static async addOrUpdateIpTransaction(ip: User.IIP, trx: Transaction) {
        const ipUser: User.IIP[] = await AccountQueries.getIpTransaction(ip, trx);
        if (!ipUser || ipUser.length === 0) {
            await AccountQueries.addIpTransaction(ip, trx);
        } else {
            await AccountQueries.updateIpTransaction({active: true}, trx);
        }
    }

    private static async addMacAddressOrUpdateTransaction(macAddress: User.IMacAddress, trx: Transaction) {
        const macAddressUser: User.IMacAddress[] = await AccountQueries.getMacAddressTransaction(macAddress, trx);
        if (!macAddressUser || macAddressUser.length === 0) {
            await AccountQueries.addMacAddressTransaction(macAddress, trx);
        } else {
            await AccountQueries.updateMacAddressTransaction({active: true}, trx);
        }
    }

    private static async addDeviceOrUpdateTransaction(device: User.IDevice, trx: Transaction) {
        const deviceUser: User.IDevice[] = await AccountQueries.getDeviceTransaction(device, trx);
        if (!deviceUser || deviceUser.length === 0) {
            await AccountQueries.addDeviceTransaction(device, trx);
        } else {
            await AccountQueries.updateDeviceTransaction({active: true}, trx);
        }
    }

    public static async createAccountTransaction(userReflect: User.IUser) {
        const knex = await DatabaseKnex.getInstance();
        return knex.transaction(async (trx: Transaction) => {
            await AccountQueries.addUserTransaction(userReflect, trx);

            const user: User.IUser[] = await AccountQueries.getUserTransaction({
                email: userReflect.email,
                username: userReflect.username,
            }, trx);
            if (!user || user.length === 0) {
                throw {
                    code: CodeError.GET_USER_BY_REFLECT,
                    message: MessageError.GET_USER_BY_REFLECT
                };
            }

            // await AccountQueries.deleteTokenTransaction({userUuid: user[0]!.uuid}, trx);

            await AccountQueries.addTokenTransaction({
                token: Tools.Token.generateToken(user[0]!.uuid!),
                userUuid: user[0]!.uuid,
                expireAt: new Date(Date.now() + (1000 * 60 * 60))
            }, trx);
        }).catch((err: ErrorDatabase) => {
            const message = DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!) ?? err?.message;
            throw {
                code: err?.code,
                message,
                sql: err?.sql,
            };
        });
    }

    public static async setVerifiedUserTransaction(userUUid: Buffer) {
        const knex = await DatabaseKnex.getInstance();
        return knex.transaction(async (trx: Transaction) => {
            const user: User.IUser[] = await AccountQueries.getUserTransaction({
                uuid: userUUid,
            }, trx);
            if (!user || user.length === 0) {
                throw {
                    code: CodeError.GET_USER_BY_REFLECT,
                    message: MessageError.GET_USER_BY_REFLECT
                };
            } else {
                if (user[0]!.isVerified) {
                    throw {
                        code: CodeError.SET_VERIFY_USER,
                        message: MessageError.SET_VERIFY_USER
                    };
                } else {
                    await AccountQueries.updateUserTransaction({
                        isVerified: true,
                    }, {
                        uuid: user[0]!.uuid,
                    }, trx);
                    await AccountQueries.deleteTokenTransaction({userUuid: user[0]!.uuid}, trx);
                }
            }
        }).then((trx: Transaction) => {
            return trx;
        }).catch((err: ErrorDatabase) => {
            const message = DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!) ?? err?.message;
            throw {
                code: err?.code,
                message,
                sql: err?.sql,
            };
        });
    }

    public static async loginUserAndGetTokenTransaction(user: User.IUser): Promise<User.IToken> {
        const knex = await DatabaseKnex.getInstance();
        return knex.transaction(async (trx: Transaction) => {
            await AccountQueries.updateUserTransaction({
                isConnected: true,
            }, {
                uuid: user.uuid,
            }, trx);

            await AccountQueries.deleteTokenTransaction({
                userUuid: user.uuid
            }, trx);

            await AccountQueries.addTokenTransaction({
                token: Tools.Token.generateToken(user.uuid!),
                userUuid: user.uuid,
                expireAt: new Date(Date.now() + (1000 * 60 * 60))
            }, trx);

            const token: User.IToken[] = await AccountQueries.getTokenTransaction({
                userUuid: user.uuid
            }, trx);
            if (!token || token.length === 0) {
                throw {
                    code: CodeError.GET_USER_BY_REFLECT,
                    message: MessageError.GET_USER_BY_REFLECT
                };
            }
            return token[0];
        }).then((token: User.IToken) => {
            return token;
        }).catch((err: ErrorDatabase) => {
            const message = DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!) ?? err?.message;
            throw {
                code: err?.code,
                message,
                sql: err?.sql,
            };
        });
    }

    public static async loginCLIUserAndGetTokenTransaction(user: User.IUser, ip: string, macAddress: string, device: string): Promise<User.IToken> {
        const knex = await DatabaseKnex.getInstance();
        return knex.transaction(async (trx: Transaction) => {

            await AccountQueries.updateUserTransaction({
                isConnected: true,
            }, {
                uuid: user.uuid,
            }, trx);

            await AccountQueries.deleteTokenTransaction({
                userUuid: user.uuid
            }, trx);

            await AccountQueries.addTokenTransaction({
                token: Tools.Token.generateToken(user?.uuid!),
                userUuid: user?.uuid,
                expireAt: new Date(Date.now() + (1000 * 60 * 60))
            }, trx);

            await AccountQueries.addOrUpdateIpTransaction({
                active: true,
                ip,
                userUuid: user?.uuid,
            }, trx);
            await AccountQueries.addMacAddressOrUpdateTransaction({
                active: true,
                macAddress,
                userUuid: user?.uuid,
            }, trx);
            await AccountQueries.addDeviceOrUpdateTransaction({
                active: true,
                device,
                userUuid: user?.uuid,
            }, trx);



            const token: User.IToken[] = await AccountQueries.getTokenTransaction({
                userUuid: user.uuid
            }, trx);
            if (!token || token.length === 0) {
                throw {
                    code: CodeError.GET_USER_BY_REFLECT,
                    message: MessageError.GET_USER_BY_REFLECT
                };
            }
            return token[0];
        }).
            then((token: User.IToken) => {
                return token;
            }).catch((err: ErrorDatabase) => {
                const message = DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!) ?? err?.message;
                throw {
                    code: err?.code,
                    message,
                    sql: err?.sql,
                };
            });
        }
    }

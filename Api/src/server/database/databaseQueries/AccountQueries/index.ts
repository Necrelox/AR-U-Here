import {DatabaseKnex, Transaction, ErrorDatabase} from '../../DatabaseKnex';
import {User} from '../../../model';
import * as Tools from '../../../tools';

enum CodeError {
    GET_USER_BY_REFLECT = 'AccountQueries::createAccountTransaction',
    SET_VERIFY_USER = 'AccountQueries::setVerifiedUser',
    ERROR_TOKEN_NOT_FOUND = 'AccountQueries::logoutUserTransaction',
}

enum MessageError {
    GET_USER_BY_REFLECT = 'User not found.',
    SET_VERIFY_USER = 'User already verified.',
    ERROR_TOKEN_NOT_FOUND = 'Token not found.',
}

export class AccountQueries {

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

    /** Transaction Queries */
    private static async addUserTransaction(userReflect: Partial<User.IUser>, trx: Transaction) {
        return DatabaseKnex.getInstance().insert(userReflect).into('USER').transacting(trx);
    }

    private static async updateUserTransaction(userReflect: Partial<User.IUser>, userReflectToFind: Partial<User.IUser>, trx: Transaction) {
        return DatabaseKnex.getInstance().update(userReflect).into('USER').where(userReflectToFind).transacting(trx);
    }

    private static async getUserTransaction(userReflectToFind: Partial<User.IUser>, trx: Transaction): Promise<User.IUser[]> {
        return DatabaseKnex.getInstance().select().from('USER').where(userReflectToFind).transacting(trx);
    }

    private static async getTokenTransaction(tokenReflectToFind: Partial<User.IToken>, trx: Transaction): Promise<User.IToken[]> {
        return DatabaseKnex.getInstance().select().from('USER_TOKEN').where(tokenReflectToFind).transacting(trx);
    }

    private static async deleteTokenTransaction(tokenReflectToFind: Partial<User.IToken>, trx: Transaction) {
        return DatabaseKnex.getInstance().delete().from('USER_TOKEN').where(tokenReflectToFind).transacting(trx);
    }

    private static async addTokenTransaction(tokenReflect: Partial<User.IToken>, trx: Transaction) {
        return DatabaseKnex.getInstance().insert(tokenReflect).into('USER_TOKEN').transacting(trx);
    }

    private static async addIpTransaction(ipReflect: Partial<User.IIP>, trx: Transaction) {
        return DatabaseKnex.getInstance().insert(ipReflect).into('USER_IP').transacting(trx);
    }

    private static async getIpTransaction(ipReflectToFind: Partial<User.IIP>, trx: Transaction): Promise<User.IIP[]> {
        return DatabaseKnex.getInstance().select().from('USER_IP').where(ipReflectToFind).transacting(trx);
    }

    private static async updateIpTransaction(ipReflect: Partial<User.IIP>, ipReflectToFind: Partial<User.IIP>, trx: Transaction) {
        return DatabaseKnex.getInstance().update(ipReflect).where(ipReflectToFind).into('USER_IP').transacting(trx);
    }

    private static async addMacAddressTransaction(macAddressReflect: Partial<User.IMacAddress>, trx: Transaction) {
        return DatabaseKnex.getInstance().insert(macAddressReflect).into('USER_MACADDRESS').transacting(trx);
    }

    private static async getMacAddressTransaction(macAddressReflectToFind: Partial<User.IMacAddress>, trx: Transaction): Promise<User.IMacAddress[]> {
        return DatabaseKnex.getInstance().select().from('USER_MACADDRESS').where(macAddressReflectToFind).transacting(trx);
    }

    private static async updateMacAddressTransaction(macAddressReflect: Partial<User.IMacAddress>, macAddressReflectToFind: Partial<User.IMacAddress>, trx: Transaction) {
        return DatabaseKnex.getInstance().update(macAddressReflect).where(macAddressReflectToFind).into('USER_MACADDRESS').transacting(trx);
    }

    private static async addDeviceTransaction(deviceReflect: Partial<User.IDevice>, trx: Transaction) {
        return DatabaseKnex.getInstance().insert(deviceReflect).into('USER_DEVICE').transacting(trx);
    }

    private static async getDeviceTransaction(deviceReflectToFind: Partial<User.IDevice>, trx: Transaction): Promise<User.IDevice[]> {
        return DatabaseKnex.getInstance().select().from('USER_DEVICE').where(deviceReflectToFind).transacting(trx);
    }

    private static async updateDeviceTransaction(deviceReflect: Partial<User.IDevice>, deviceReflectToFind: Partial<User.IDevice>, trx: Transaction) {
        return DatabaseKnex.getInstance().update(deviceReflect).where(deviceReflectToFind).into('USER_DEVICE').transacting(trx);
    }

    private static async addOrUpdateIpTransaction(ipReflect: Partial<User.IIP>, trx: Transaction) {
        const ipUser: User.IIP[] = await AccountQueries.getIpTransaction({
            ip: ipReflect.ip,
            userUuid: ipReflect.userUuid,
        }, trx);
        if (!ipUser || ipUser.length === 0) {
            await AccountQueries.addIpTransaction(ipReflect, trx);
        } else {
            await AccountQueries.updateIpTransaction({active: true}, {
                ip: ipReflect.ip,
                userUuid: ipReflect.userUuid,
            }, trx);
        }
    }

    private static async addMacAddressOrUpdateTransaction(macAddressReflect: Partial<User.IMacAddress>, trx: Transaction) {
        const macAddressUser: User.IMacAddress[] = await AccountQueries.getMacAddressTransaction({
            macAddress: macAddressReflect.macAddress,
            userUuid: macAddressReflect.userUuid,
        }, trx);
        if (!macAddressUser || macAddressUser.length === 0) {
            await AccountQueries.addMacAddressTransaction(macAddressReflect, trx);
        } else {
            await AccountQueries.updateMacAddressTransaction({active: true}, {
                macAddress: macAddressReflect.macAddress,
                userUuid: macAddressReflect.userUuid,
            }, trx);
        }
    }

    private static async addDeviceOrUpdateTransaction(deviceReflect: Partial<User.IDevice>, trx: Transaction) {
        const deviceUser: User.IDevice[] = await AccountQueries.getDeviceTransaction({
            device: deviceReflect.device,
            userUuid: deviceReflect.userUuid,
        }, trx);
        if (!deviceUser || deviceUser.length === 0) {
            await AccountQueries.addDeviceTransaction(deviceReflect, trx);
        } else {
            await AccountQueries.updateDeviceTransaction({active: true}, {
                device: deviceReflect.device,
                userUuid: deviceReflect.userUuid,
            }, trx);
        }
    }

    public static async createAccountTransaction(userReflect: Partial<User.IUser>) {
        return (await DatabaseKnex.getInstance()).transaction(async (trx: Transaction) => {
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
            await AccountQueries.addTokenTransaction({
                token: Tools.Token.generateToken(user[0]?.uuid as Buffer),
                userUuid: user[0]?.uuid,
                expireAt: new Date(Date.now() + (1000 * 60 * 60))
            }, trx);
        }).catch((err: ErrorDatabase) => {
            const message = DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string) ?? err?.message;
            throw {
                code: err?.code,
                message,
                sql: err?.sql,
            };
        });
    }

    public static async setVerifiedUserTransaction(userUUid: Buffer) {
        return (await DatabaseKnex.getInstance()).transaction(async (trx: Transaction) => {
            const user: User.IUser[] = await AccountQueries.getUserTransaction({
                uuid: userUUid,
            }, trx);
            if (!user || user.length === 0)
                throw {
                    code: CodeError.GET_USER_BY_REFLECT,
                    message: MessageError.GET_USER_BY_REFLECT
                };
            if (user[0]?.isVerified)
                throw {
                    code: CodeError.SET_VERIFY_USER,
                    message: MessageError.SET_VERIFY_USER
                };
            await Promise.all([
                AccountQueries.updateUserTransaction({
                    isVerified: true,
                }, {
                    uuid: user[0]?.uuid,
                }, trx),
                AccountQueries.deleteTokenTransaction({userUuid: user[0]?.uuid}, trx)
            ]);
        }).catch((err: ErrorDatabase) => {
            const message = DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string) ?? err?.message;
            throw {
                code: err?.code,
                message,
                sql: err?.sql,
            };
        });
    }

    public static async loginUserAndGetTokenTransaction(userUuid: Buffer): Promise<User.IToken> {
        return (await DatabaseKnex.getInstance()).transaction(async (trx: Transaction) => {
            await Promise.all([
                AccountQueries.updateUserTransaction({
                    isConnected: true,
                }, {
                    uuid: userUuid,
                }, trx),
                AccountQueries.deleteTokenTransaction({
                    userUuid
                }, trx)
            ]);

            await AccountQueries.addTokenTransaction({
                token: Tools.Token.generateToken(userUuid),
                userUuid,
                expireAt: new Date(Date.now() + (1000 * 60 * 60))
            }, trx);

            const token: User.IToken[] = await AccountQueries.getTokenTransaction({
                userUuid,
            }, trx);
            if (!token || token.length === 0)
                throw {
                    code: CodeError.GET_USER_BY_REFLECT,
                    message: MessageError.GET_USER_BY_REFLECT
                };
            return token[0] as User.IToken;
        }).then((token: User.IToken) => {
            return token;
        }).catch((err: ErrorDatabase) => {
            const message = DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string) ?? err?.message;
            throw {
                code: err?.code,
                message,
                sql: err?.sql,
            };
        });
    }

    public static async loginCLIUserAndGetTokenTransaction(userUuid: Buffer, ip: string, macAddress: string, device: string): Promise<User.IToken> {
        return (await DatabaseKnex.getInstance()).transaction(async (trx: Transaction) => {

            await Promise.all([
                AccountQueries.updateUserTransaction({
                    isConnected: true,
                }, {
                    uuid: userUuid,
                }, trx),
                AccountQueries.deleteTokenTransaction({
                    userUuid
                }, trx),
            ]);
            await AccountQueries.addTokenTransaction({
                token: Tools.Token.generateToken(userUuid),
                userUuid,
                expireAt: new Date(Date.now() + (1000 * 60 * 60))
            }, trx);

            await Promise.all([
                AccountQueries.addOrUpdateIpTransaction({
                    active: true,
                    ip,
                    userUuid,
                }, trx),
                AccountQueries.addMacAddressOrUpdateTransaction({
                    active: true,
                    macAddress,
                    userUuid,
                }, trx),
                AccountQueries.addDeviceOrUpdateTransaction({
                    active: true,
                    device,
                    userUuid,
                }, trx)
            ]);

            const token: User.IToken[] = await AccountQueries.getTokenTransaction({
                userUuid
            }, trx);
            if (!token || token.length === 0) {
                throw {
                    code: CodeError.GET_USER_BY_REFLECT,
                    message: MessageError.GET_USER_BY_REFLECT
                };
            }
            return token[0] as User.IToken;
        }).then((token: User.IToken) => {
            return token;
        }).catch((err: ErrorDatabase) => {
            const message = DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string) ?? err?.message;
            throw {
                code: err?.code,
                message,
                sql: err?.sql,
            };
        });
    }

    public static async logoutUserTransaction(bearerToken: string) {
        return (await DatabaseKnex.getInstance()).transaction(async (trx: Transaction) => {

            const token: User.IToken[] = await AccountQueries.getTokenTransaction({
                token: bearerToken,
            }, trx);
            if (!token || token.length === 0) {
                throw {
                    code: CodeError.ERROR_TOKEN_NOT_FOUND,
                    message: MessageError.ERROR_TOKEN_NOT_FOUND
                };
            }

            await Promise.all([
                AccountQueries.updateUserTransaction({isConnected: false}, {uuid: token[0]?.userUuid}, trx),
                AccountQueries.updateIpTransaction({active: false}, {
                    userUuid: token[0]?.userUuid,
                    active: true,
                }, trx),
                AccountQueries.updateDeviceTransaction({active: false}, {
                    userUuid: token[0]?.userUuid,
                    active: true,
                }, trx),
                AccountQueries.updateMacAddressTransaction({active: false}, {
                    userUuid: token[0]?.userUuid,
                    active: true,
                }, trx),
                AccountQueries.deleteTokenTransaction({
                    userUuid: token[0]?.userUuid
                }, trx)
            ]);

            return token[0] as User.IToken;

        }).then((token: User.IToken) => {
            return token;
        }).catch((err: ErrorDatabase) => {
            const message = DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string) ?? err?.message;
            throw {
                code: err?.code,
                message,
                sql: err?.sql,
            };
        });
    }


}

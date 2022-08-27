import {DatabaseKnex, Transaction, ErrorDatabase} from '../../../DatabaseKnex';
import {MessageError} from '../../../../messageError';
import {
    UserModelQueries,
    TokenModelQueries,
    DeviceModelQueries,
    MacAddressModelQueries,
    IpModelQueries
} from '../../models';
import {
    IUser,
    IToken,
    ITokenFKUser,
    IDevice,
    IIP,
    IMacAddress
} from '../../../../models';
import {Token} from '../../../../tools';


export class AccountQueries {

    /** Simple Queries */

    /** Transaction Queries */

    private static async addOrUpdateIpTransaction(ipReflect: Partial<IIP>, trx: Transaction) {
        const ipUser: IIP[] = await IpModelQueries.transactionGet({
            ip: ipReflect.ip,
        }, {
            ip: true
        }, trx);
        if (!ipUser || ipUser.length === 0) {
            await IpModelQueries.transactionCreate(ipReflect, trx);
        } else {
            await IpModelQueries.transactionUpdate({active: true}, {
                ip: ipReflect.ip,
            }, trx);
        }
    }

    private static async addMacAddressOrUpdateTransaction(macAddressReflect: Partial<IMacAddress>, trx: Transaction) {
        const macAddressUser: IMacAddress[] = await MacAddressModelQueries.transactionGet({
            macAddress: macAddressReflect.macAddress,
        }, {
            macAddress: true
        }, trx);
        if (!macAddressUser || macAddressUser.length === 0) {
            await MacAddressModelQueries.transactionCreate(macAddressReflect, trx);
        } else {
            await MacAddressModelQueries.transactionUpdate({active: true}, {
                macAddress: macAddressReflect.macAddress,
            }, trx);
        }
    }

    private static async addDeviceOrUpdateTransaction(deviceReflect: Partial<IDevice>, trx: Transaction) {
        const deviceUser: IDevice[] = await DeviceModelQueries.transactionGet({
            device: deviceReflect.device,
            userUuid: deviceReflect.userUuid,
        }, {
            device: true
        }, trx);
        if (!deviceUser || deviceUser.length === 0) {
            await DeviceModelQueries.transactionCreate(deviceReflect, trx);
        } else {
            await DeviceModelQueries.transactionUpdate({active: true}, {
                device: deviceReflect.device,
                userUuid: deviceReflect.userUuid,
            }, trx);
        }
    }

    public static async createAccountTransaction(userReflect: Partial<IUser>): Promise<Buffer> {
        return (await DatabaseKnex.getInstance()).transaction(async (trx: Transaction) => {
            await UserModelQueries.transactionCreate(userReflect, trx);
            const user: Partial<IUser>[] = await UserModelQueries.transactionGet({
                email: userReflect.email,
                username: userReflect.username,
            }, {
                uuid: true
            }, trx);
            if (!user || user.length === 0) {
                throw {
                    code: 'AccountQueries::createAccountTransaction',
                    message: MessageError.USER_NOT_FOUND
                };
            }
            await TokenModelQueries.transactionCreate({
                token: Token.generateToken(user[0]?.uuid as Buffer),
                userUuid: user[0]?.uuid,
                expireAt: new Date(Date.now() + ((1000 * 60 * 60) * 24)) // todo à voir pour une configuration plus précise
            }, trx);
            return user[0]?.uuid as Buffer;
        }).catch((err: ErrorDatabase) => {
            const message = DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string) ?? err?.message;
            throw {
                code: err?.code,
                message,
                sql: err?.sql,
            };
        });
    }

    public static async setVerifiedUserTransaction(bearerToken: string) {
        return (await DatabaseKnex.getInstance()).transaction(async (trx: Transaction) => {
            const tokenFkUser: Partial<ITokenFKUser>[] = await TokenModelQueries.transactionGetFKUser({
                token: bearerToken
            }, {
                isVerified: true,
                userUuid: true
            }, trx);
            if (!tokenFkUser || tokenFkUser.length === 0) {
                throw {
                    code: 'AccountQueries::setVerifiedUserTransaction',
                    message: MessageError.TOKEN_FK_USER_NOT_FOUND
                };
            }
            if (tokenFkUser[0]?.isVerified)
                throw {
                    code: 'AccountQueries::setVerifiedUserTransaction',
                    message: MessageError.USER_ALREADY_VERIFIED
                };

            const test: IUser[] = await UserModelQueries.transactionGet({
                uuid: tokenFkUser[0]?.userUuid
            }, {}, trx);
            console.log(test);

            await Promise.all([
                UserModelQueries.transactionUpdate({
                    isVerified: true
                }, {
                    uuid: tokenFkUser[0]?.userUuid
                }, trx),
                TokenModelQueries.transactionDelete({
                    userUuid: tokenFkUser[0]?.userUuid
                }, trx)
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

    public static async loginAndGetTokenTransaction(userUuid: Buffer, cli: { ip: string, macAddress: string, device: string } | undefined = undefined): Promise<Partial<IToken>> {
        return (await DatabaseKnex.getInstance()).transaction(async (trx: Transaction) => {
            if (cli !== undefined) {
                await Promise.all([
                    this.addOrUpdateIpTransaction({
                        ip: cli.ip,
                        userUuid
                    }, trx),

                    this.addMacAddressOrUpdateTransaction({
                        macAddress: cli.macAddress,
                        userUuid
                    }, trx),

                    this.addDeviceOrUpdateTransaction({
                        device: cli.device,
                        userUuid
                    }, trx)
                ]);
            }

            await Promise.all([
                UserModelQueries.transactionUpdate({
                    isConnected: true
                }, {
                    uuid: userUuid
                }, trx),
                TokenModelQueries.transactionDelete({
                    userUuid
                }, trx)
            ]);

            await TokenModelQueries.transactionCreate({
                token: Token.generateToken(userUuid),
                userUuid,
                expireAt: new Date(Date.now() + (1000 * 60 * 60))
            }, trx);
            const token: Partial<IToken>[] = await TokenModelQueries.transactionGet({
                userUuid,
            }, {
                token: true,
            }, trx);
            if (!token || token.length === 0)
                throw {
                    code: 'AccountQueries::loginUserAndGetTokenTransaction',
                    message: MessageError.TOKEN_NOT_FOUND
                };

            return token[0] as Partial<IToken>;
        }).then((token: Partial<IToken>) => {
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
            const token: IToken[] = await TokenModelQueries.transactionGet({
                token: bearerToken,
            }, {

            }, trx);
            if (!token || token.length === 0) {
                throw {
                    code: 'AccountQueries::logoutUserTransaction',
                    message: MessageError.TOKEN_NOT_FOUND
                };
            }

            await Promise.all([
                UserModelQueries.transactionUpdate({
                    isConnected: false
                }, {
                    uuid: token[0]?.userUuid
                }, trx),

                IpModelQueries.transactionUpdate({
                    active: false
                }, {
                    userUuid: token[0]?.userUuid,
                    active: true,
                }, trx),
                DeviceModelQueries.transactionUpdate({
                    active: false
                }, {
                    userUuid: token[0]?.userUuid,
                    active: true,
                }, trx),
                MacAddressModelQueries.transactionUpdate({
                    active: false
                }, {
                    userUuid: token[0]?.userUuid,
                    active: true,
                }, trx),
                TokenModelQueries.transactionDelete({
                    userUuid: token[0]?.userUuid
                }, trx)
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


}

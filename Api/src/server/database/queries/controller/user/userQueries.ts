import {DatabaseKnex, Transaction, ErrorDatabase} from '../../../DatabaseKnex';
import {
    IUser,
    IToken,
    ITokenFKUser,
} from '../../../../models';
import {
    DeviceModelQueries,
    IpModelQueries,
    MacAddressModelQueries,
    TokenModelQueries,
    UserModelQueries
} from "../../models";
import {MessageError} from '../../../../messageError';

export class UserQueries {
    /** Simple Queries */

    /** Transaction Queries */
    public static async updateUserByTokenTransaction(userUpdate: Partial<IUser>, tokenForSearch: Partial<IToken>) {
        const knex = await DatabaseKnex.getInstance();
        return knex.transaction(async (trx: Transaction) => {

            const tokenFKUsers: ITokenFKUser[] = await TokenModelQueries.transactionGetFKUser(tokenForSearch, {
                token: true,
                userUuid: true,
            }, trx);
            if (tokenFKUsers.length === 0) {
                throw {
                    code: 'UserQueries::updateUserByTokenTransaction',
                    message: MessageError.USER_NOT_FOUND,
                };
            }

            if ('password' in userUpdate) {
                await TokenModelQueries.transactionDelete({
                    token: tokenFKUsers[0]?.token,
                    userUuid: tokenFKUsers[0]?.userUuid,
                }, trx);

                await Promise.all([
                    UserModelQueries.transactionUpdate({
                        isConnected: false
                    }, {
                        uuid: tokenFKUsers[0]?.userUuid
                    }, trx),
                    IpModelQueries.transactionUpdate({
                        active: false
                    }, {
                        userUuid: tokenFKUsers[0]?.userUuid,
                        active: true,
                    }, trx),

                    DeviceModelQueries.transactionUpdate({
                        active: false
                    }, {
                        userUuid: tokenFKUsers[0]?.userUuid,
                        active: true,
                    }, trx),
                    MacAddressModelQueries.transactionUpdate({
                        active: false
                    }, {
                        userUuid: tokenFKUsers[0]?.userUuid,
                        active: true,
                    }, trx),
                    TokenModelQueries.transactionDelete({
                        userUuid: tokenFKUsers[0]?.userUuid
                    }, trx)
                ]);
            }

            await UserModelQueries.transactionUpdate(userUpdate, {
                uuid: tokenFKUsers[0]?.userUuid,
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

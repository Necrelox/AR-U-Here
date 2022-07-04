import {DatabaseKnex, Transaction, ErrorDatabase} from '../../DatabaseKnex';
import {User} from '../../../model';

enum CodeError {
    UPDATE_USER_TRANSACTION = 'UserQueries::updateUserTransaction',
}

enum MessageError {
    NO_USER_FOUND_BY_TOKEN = 'No user found by token.',
}


export class UserQueries {
    /** Sample Queries */

    public static async getUserByFKToken(token: User.IToken): Promise<User.ITokenFKUser[]> {
        return DatabaseKnex.getInstance().select().into('USER_TOKEN')
            .where(token)
            .join('USER', 'USER.uuid', '=', 'USER_TOKEN.userUuid')
            .then((tokens: User.ITokenFKUser[]) => {
                return tokens;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                };
            });
    }

    public static async deleteToken(token: User.IToken) {
        return DatabaseKnex.getInstance().delete().from('USER_TOKEN').where(token);
    }

    public static async addToken(token: User.IToken) {
        return DatabaseKnex.getInstance().insert(token).into('USER_TOKEN');
    }

    /** Transaction Queries */
    private static async getUserByFKTokenTransaction(token: User.IToken, trx: Transaction): Promise<User.ITokenFKUser[]> {
        return DatabaseKnex.getInstance().select().from('USER_TOKEN')
            .join('USER', 'USER.uuid', '=', 'USER_TOKEN.userUuid')
            .where(token)
            .transacting(trx);
    }

    private static async updateUserTransaction(userReflect: User.IUser, where: User.IUser, trx: Transaction) {
        return DatabaseKnex.getInstance().update(userReflect).into('USER').where(where).transacting(trx);
    }

    public static async updateUserByTokenTransaction(userUpdate: User.IUser, tokenForSearch: User.IToken) {
        const knex = await DatabaseKnex.getInstance();
        return knex.transaction(async (trx: Transaction) => {

            const tokenFKUsers: User.ITokenFKUser[] = await UserQueries.getUserByFKTokenTransaction(tokenForSearch, trx);
            if (tokenFKUsers.length === 0) {
                throw {
                    code: CodeError.UPDATE_USER_TRANSACTION,
                    message: MessageError.NO_USER_FOUND_BY_TOKEN,
                };
            }

            await UserQueries.updateUserTransaction(userUpdate, {
                uuid: tokenFKUsers[0]!.userUuid,
            }, trx);


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
}

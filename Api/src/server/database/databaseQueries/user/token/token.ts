import {DatabaseKnex, ErrorDatabase} from "../../../DatabaseKnex";
import * as Models from "../../../../model";

export class Token {
    private static readonly TABLE_NAME: string = "USER_TOKEN";

    public static async select(token: Models.User.IToken): Promise<Models.User.IToken[]> {
        return DatabaseKnex.getInstance().select().into(Token.TABLE_NAME)
            .where(token)
            .then((tokens: Models.User.IToken[]) => {
                return tokens;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static async selectFK(token: Models.User.IToken): Promise<Models.User.ITokenFKUser[]> {
        return DatabaseKnex.getInstance().select().into(Token.TABLE_NAME)
            .where(token)
            .join('USER', 'USER.uuid', "=", 'USER_TOKEN.userUuid')
            .then((tokens: Models.User.ITokenFKUser[]) => {
                return tokens;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static async insert(token: Models.User.IToken) : Promise<Models.User.IToken> {
        return DatabaseKnex.getInstance().insert(token).into(Token.TABLE_NAME)
            .then(() => {
                return token;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
    public static async update(where : Models.User.IToken, token: Models.User.IToken) : Promise<Models.User.IToken> {
        return DatabaseKnex.getInstance().update(token).into(Token.TABLE_NAME)
            .where(where)
            .then(() => {
                return token;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static async delete(where : Models.User.IToken) : Promise<Models.User.IToken> {
        return DatabaseKnex.getInstance().delete().from(Token.TABLE_NAME)
            .where(where)
            .then(() => {
                return where;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
}

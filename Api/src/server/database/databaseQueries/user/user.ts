import {DatabaseKnex, ErrorDatabase} from "../../DatabaseKnex";
import * as Models from "../../../model"

export class User {
    private static readonly TABLE_NAME: string = "USER";

    public static async select(user: Models.User.IUser): Promise<Models.User.IUser[]> {
        return DatabaseKnex.getInstance().select().into(User.TABLE_NAME)
            .where(user)
            .then((users: Models.User.IUser[]) => {
                return users;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static async insert(user: Models.User.IUser) : Promise<Models.User.IUser> {
        return DatabaseKnex.getInstance().insert(user).into(User.TABLE_NAME)
            .then(() => {
                return user;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static async update(where : Models.User.IUser, user: Models.User.IUser) : Promise<Models.User.IUser> {
        return DatabaseKnex.getInstance().update(user).into(User.TABLE_NAME)
            .where(where)
            .then(() => {
                return user;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static async delete(where : Models.User.IUser) : Promise<Models.User.IUser> {
        return DatabaseKnex.getInstance().delete().from(User.TABLE_NAME)
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

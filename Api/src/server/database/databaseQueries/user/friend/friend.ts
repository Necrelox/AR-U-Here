import {DatabaseKnex, ErrorDatabase} from "../../../DatabaseKnex";
import * as Models from "../../../../model";

export class Friend {
    private static readonly TABLE_NAME: string = "USER_FRIEND";

    public static async select(friend: Models.User.IFriend): Promise<Models.User.IFriend[]> {
        return DatabaseKnex.getInstance().select().into(Friend.TABLE_NAME)
            .where(friend)
            .then((friends: Models.User.IFriend[]) => {
                return friends;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static async selectFK(friend: Models.User.IFriend): Promise<Models.User.IFriendFKUser[]> {
        return DatabaseKnex.getInstance().select().into(Friend.TABLE_NAME)
            .where(friend)
            .join('USER', 'USER.uuid', "=", 'USER_FRIEND.friend')
            .then((friends: Models.User.IFriendFKUser[]) => {
                return friends;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static async insert(friend: Models.User.IFriend) : Promise<Models.User.IFriend> {
        return DatabaseKnex.getInstance().insert(friend).into(Friend.TABLE_NAME)
            .then(() => {
                return friend;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
    public static async update(where : Models.User.IFriend, friend: Models.User.IFriend) : Promise<Models.User.IFriend> {
        return DatabaseKnex.getInstance().update(friend).into(Friend.TABLE_NAME)
            .where(where)
            .then(() => {
                return friend;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
    public static async delete(where : Models.User.IFriend) : Promise<Models.User.IFriend> {
        return DatabaseKnex.getInstance().delete().from(Friend.TABLE_NAME)
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

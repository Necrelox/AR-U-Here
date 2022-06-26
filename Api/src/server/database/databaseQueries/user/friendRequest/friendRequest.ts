import {DatabaseKnex, ErrorDatabase} from "../../../DatabaseKnex";
import * as Models from "../../../../model";

export class FriendRequest {
    private static readonly TABLE_NAME: string = "USER_FRIEND_REQUESTS";

    public static async select(friendRequest: Models.User.IFriendRequest): Promise<Models.User.IFriendRequest[]> {
        return DatabaseKnex.getInstance().select().into(FriendRequest.TABLE_NAME)
            .where(friendRequest)
            .then((friendRequests: Models.User.IFriendRequest[]) => {
                return friendRequests;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static async selectFKUserSending(friendRequest: Models.User.IFriendRequest): Promise<Models.User.IFriendRequestFKUser[]> {
        return DatabaseKnex.getInstance().select().into(FriendRequest.TABLE_NAME)
            .where(friendRequest)
            .join('USER', 'USER.uuid', "=", 'USER_FRIEND_REQUESTS.userSendingRequest')
            .then((friendRequests: Models.User.IFriendRequestFKUser[]) => {
                return friendRequests;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static async selectFKUserRequested(friendRequest: Models.User.IFriendRequest): Promise<Models.User.IFriendRequestFKUser[]> {
        return DatabaseKnex.getInstance().select().into(FriendRequest.TABLE_NAME)
            .where(friendRequest)
            .join('USER', 'USER.uuid', "=", 'USER_FRIEND_REQUESTS.userRequested')
            .then((friendRequests: Models.User.IFriendRequestFKUser[]) => {
                return friendRequests;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static async insert(friendRequest: Models.User.IFriendRequest) : Promise<Models.User.IFriendRequest> {
        return DatabaseKnex.getInstance().insert(friendRequest).into(FriendRequest.TABLE_NAME)
            .then(() => {
                return friendRequest;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
    public static async update(where : Models.User.IFriendRequest, friendRequest: Models.User.IFriendRequest) : Promise<Models.User.IFriendRequest> {
        return DatabaseKnex.getInstance().update(friendRequest).into(FriendRequest.TABLE_NAME)
            .where(where)
            .then(() => {
                return friendRequest;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
    public static async delete(where : Models.User.IFriendRequest) : Promise<Models.User.IFriendRequest> {
        return DatabaseKnex.getInstance().delete().from(FriendRequest.TABLE_NAME)
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

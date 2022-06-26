import {DatabaseKnex, ErrorDatabase} from "../../../DatabaseKnex";
import * as Models from "../../../../model";

export class Message {
    private static readonly TABLE_NAME: string = "USER_MESSAGE";

    public static select(message: Models.User.IReport): Promise<Models.User.IReport[]> {
        return DatabaseKnex.getInstance().select().into(Message.TABLE_NAME)
            .where(message)
            .then((messages: Models.User.IMessage[]) => {
                return messages;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static insert(message: Models.User.IMessage) : Models.User.IMessage | never {
        return DatabaseKnex.getInstance().insert(message).into(Message.TABLE_NAME)
            .then(() => {
                return message;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
    public static update(where : Models.User.IMessage, message: Models.User.IMessage) : Models.User.IMessage | never {
        return DatabaseKnex.getInstance().update(message).into(Message.TABLE_NAME)
            .where(where)
            .then(() => {
                return message;
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

import {DatabaseKnex, ErrorDatabase} from "../../../DatabaseKnex";
import * as Models from "../../../../model";

export class History {
    private static readonly TABLE_NAME: string = "USER_HISTORY";

    public static select(history: Models.User.IHistory): Promise<Models.User.IHistory[]> {
        return DatabaseKnex.getInstance().select().into(History.TABLE_NAME)
            .where(history)
            .then((history: Models.User.IHistory[]) => {
                return history;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static insert(history: Models.User.IHistory) : Models.User.IHistory | never {
        return DatabaseKnex.getInstance().insert(history).into(History.TABLE_NAME)
            .then(() => {
                return history;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
    public static update(where : Models.User.IHistory, history: Models.User.IHistory) : Models.User.IHistory | never {
        return DatabaseKnex.getInstance().update(history).into(History.TABLE_NAME)
            .where(where)
            .then(() => {
                return history;
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

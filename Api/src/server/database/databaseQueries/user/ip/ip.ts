import {DatabaseKnex, ErrorDatabase} from "../../../DatabaseKnex";
import * as Models from "../../../../model";

export class Ip {
    private static readonly TABLE_NAME: string = "USER_IP";

    public static async select(ip: Models.User.IIP): Promise<Models.User.IIP[]> {
        return DatabaseKnex.getInstance().select().into(Ip.TABLE_NAME)
            .where(ip)
            .then((ips: Models.User.IIP[]) => {
                return ips;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static async insert(ip: Models.User.IIP) : Promise<Models.User.IIP> {
        return DatabaseKnex.getInstance().insert(ip).into(Ip.TABLE_NAME)
            .then(() => {
                return ip;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
    public static async update(where : Models.User.IIP, ip: Models.User.IIP) : Promise<Models.User.IIP> {
        return DatabaseKnex.getInstance().update(ip).into(Ip.TABLE_NAME)
            .where(where)
            .then(() => {
                return ip;
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

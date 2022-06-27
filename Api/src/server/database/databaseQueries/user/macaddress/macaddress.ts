import {DatabaseKnex, ErrorDatabase} from "../../../DatabaseKnex";
import * as Models from "../../../../model";

export class Macaddress {
    private static readonly TABLE_NAME: string = "USER_MACADDRESS";

    public static select(macaddress: Models.User.IMacAddress): Promise<Models.User.IMacAddress[]> {
        return DatabaseKnex.getInstance().select().into(Macaddress.TABLE_NAME)
            .where(macaddress)
            .then((macs: Models.User.IMacAddress[]) => {
                return macs;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static insert(macaddress: Models.User.IMacAddress) : Models.User.IMacAddress | never {
        return DatabaseKnex.getInstance().insert(macaddress).into(Macaddress.TABLE_NAME)
            .then(() => {
                return macaddress;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
    public static update(where : Models.User.IMacAddress, macaddress: Models.User.IMacAddress) : Models.User.IMacAddress | never {
        return DatabaseKnex.getInstance().update(macaddress).into(Macaddress.TABLE_NAME)
            .where(where)
            .then(() => {
                return macaddress;
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

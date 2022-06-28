import {DatabaseKnex, ErrorDatabase} from "../../../DatabaseKnex";
import * as Models from "../../../../model";

export class Logo {
    private static readonly TABLE_NAME: string = "USER_LOGO";

    public static select(logo: Models.User.ILogo): Promise<Models.User.ILogo[]> {
        return DatabaseKnex.getInstance().select().into(Logo.TABLE_NAME)
            .where(logo)
            .then((logos: Models.User.ILogo[]) => {
                return logos;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static insert(logo: Models.User.ILogo) : Models.User.ILogo | never {
        return DatabaseKnex.getInstance().insert(logo).into(Logo.TABLE_NAME)
            .then(() => {
                return logo;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
    public static update(where : Models.User.ILogo, logo: Models.User.ILogo) : Models.User.ILogo | never {
        return DatabaseKnex.getInstance().update(logo).into(Logo.TABLE_NAME)
            .where(where)
            .then(() => {
                return logo;
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

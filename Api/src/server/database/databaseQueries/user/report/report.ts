import {DatabaseKnex, ErrorDatabase} from "../../../DatabaseKnex";
import * as Models from "../../../../model";

export class Report {
    private static readonly TABLE_NAME: string = "USER_REPORT";

    public static select(report: Models.User.IReport): Promise<Models.User.IReport[]> {
        return DatabaseKnex.getInstance().select().into(Report.TABLE_NAME)
            .where(report)
            .then((reports: Models.User.IReport[]) => {
                return reports;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static insert(report: Models.User.IReport) : Models.User.IReport | never {
        return DatabaseKnex.getInstance().insert(report).into(Report.TABLE_NAME)
            .then(() => {
                return report;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
    public static update(where : Models.User.IReport, report: Models.User.IReport) : Models.User.IReport | never {
        return DatabaseKnex.getInstance().update(report).into(Report.TABLE_NAME)
            .where(where)
            .then(() => {
                return report;
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

import {DatabaseKnex, ErrorDatabase} from "../../../DatabaseKnex";
import * as Models from "../../../../model";

export class Device {
    private static readonly TABLE_NAME: string = "USER_DEVICE";

    public static select(device: Models.User.IDevice): Promise<Models.User.IDevice[]> {
        return DatabaseKnex.getInstance().select().into(Device.TABLE_NAME)
            .where(device)
            .then((devices: Models.User.IDevice[]) => {
                return devices;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static insert(device: Models.User.IDevice) : Models.User.IDevice | never {
        return DatabaseKnex.getInstance().insert(device).into(Device.TABLE_NAME)
            .then(() => {
                return device;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
    public static update(where : Models.User.IDevice, device: Models.User.IDevice) : Models.User.IDevice | never {
        return DatabaseKnex.getInstance().update(device).into(Device.TABLE_NAME)
            .where(where)
            .then(() => {
                return device;
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

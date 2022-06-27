import * as Models from "../../../model";
import * as Tools from "../../../tools";
import {CodeError} from "../enum/codeError";
import {MessageError} from "../enum/messageError";
import {ControllerUtils} from "../../utils/controllerUtils";

export abstract class UserUtils extends ControllerUtils {

    /** USER */

    protected async checkSyntaxUsername(username: string) {
        const regex: RegExp = /^\w+$/;
        if (!regex.test(username))
            throw {
                code: CodeError.CHECK_SYNTAX_USERNAME,
                message: MessageError.CHECK_SYNTAX_USERNAME
            }
    }

    protected async checkLengthUsername(username: string) {
        if (username.length < 4 || username.length > 20)
            throw {
                code: CodeError.CHECK_LENGTH_USERNAME,
                message: MessageError.CHECK_LENGTH_USERNAME
            };
    }

    protected async checkLengthPassword(password: string) {
        if (password.length < 6 || password.length > 20)
            throw {
                code: CodeError.CHECK_LENGTH_PASSWORD,
                message: MessageError.CHECK_LENGTH_PASSWORD
            };
    }

    protected async checkSyntaxPassword(password: string) {
        const regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
        if (!regex.test(password))
            throw {
                code: CodeError.CHECK_SYNTAX_PASSWORD,
                message: MessageError.CHECK_SYNTAX_PASSWORD
            }
    }

    protected async checkUserReflectForModify(userReflect: Models.User.IUser) {
        if ('email' in userReflect) {
            Tools.Mailer.checkEmailHasBadSyntax(userReflect.email!);
            Tools.Mailer.checkEmailIsTemporary(userReflect.email!);
        }
        if ('username' in userReflect) {
            await this.checkSyntaxUsername(userReflect.username!);
            await this.checkLengthUsername(userReflect.username!);
        }
        if ('password' in userReflect) {
            const password: string = userReflect.password!.toString();
            await this.checkLengthPassword(password);
            await this.checkSyntaxPassword(password);
        }
    }
}

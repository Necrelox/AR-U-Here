import * as Models from '../../../model';
import * as Tools from '../../../tools';
import {ControllerUtils} from '../../utils/controllerUtils';

interface ReqBody {
    password: string;
    email: string;
    username: string;
    activityMessage: string;
    address: string;
    phone: string;
}

export enum CodeError {
    PHONE_NUMBER_INVALID = "UserUtils::transformBodyToUserForUpdate"
}
export enum MessageError {
    PHONE_NUMBER_INVALID = 'PHONE_NUMBER_INVALID',
}


export abstract class UserUtils extends ControllerUtils {

    /** USER */
    protected async transformBodyToUserForUpdate(body: ReqBody) : Promise<Partial<Models.User.IUser>> {
        const user: Partial<Models.User.IUser> = {};
        if ('email' in body) {
            await Tools.Mailer.checkEmailHasBadSyntax(body.email);
            await Tools.Mailer.checkEmailIsTemporary(body.email);
            user.email = body.email;
        }
        if ('username' in body) {
            await this.checkSyntaxUsername(body.username);
            await this.checkLengthUsername(body.username);
            user.username = body.username;
        }
        if ('password' in body) {
            await this.checkLengthPassword(body.password);
            await this.checkSyntaxPassword(body.password);
            user.password = Tools.PasswordEncrypt.encrypt(body.password);
        }
        if ('activityMessage' in body) {
            user.activityMessage = body.activityMessage;
        }
        if ('address' in body) {
            user.address = body.address;
        }
        if ('phone' in body) {
            const regex = /^\d{3}\.\d{3}\.\d{3}\.\d{3}$/;
            if (!regex.test(body.phone)) {
                throw {
                    code: CodeError.PHONE_NUMBER_INVALID,
                    message: MessageError.PHONE_NUMBER_INVALID
                };
            }

            user.phone = body.phone;
        }
        return user;
    }
}

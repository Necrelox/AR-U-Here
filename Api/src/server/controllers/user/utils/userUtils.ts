import {IUser}  from '../../../models';
import {Mailer, PasswordEncrypt} from '../../../tools';
import {ControllerUtils} from '../../utils/controllerUtils';

import {MessageError} from '../../../messageError';

interface ReqBody {
    password: string;
    email: string;
    username: string;
    activityMessage: string;
    address: string;
    phone: string;
}


export abstract class UserUtils extends ControllerUtils {

    /** USER */
    protected async transformBodyToUserForUpdate(body: ReqBody) : Promise<Partial<IUser>> {
        const user: Partial<IUser> = {};
        if ('email' in body) {
            await Mailer.checkEmailHasBadSyntax(body.email);
            await Mailer.checkEmailIsTemporary(body.email);
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
            user.password = PasswordEncrypt.encrypt(body.password);
        }
        if ('activityMessage' in body) {
            user.activityMessage = body.activityMessage;
        }
        if ('address' in body) {
            user.address = body.address;
        }
        if ('phone' in body) {
            const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            if (!regex.test(body.phone)) {
                throw {
                    code: 'UserUtils::transformBodyToUserForUpdate',
                    message: MessageError.USER_PHONE_NUMBER_INVALID
                };
            }
            user.phone = body.phone;
        }
        return user;
    }
}

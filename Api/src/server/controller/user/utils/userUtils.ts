import * as Models from '../../../model';
import * as Tools from '../../../tools';
import {ControllerUtils} from '../../utils/controllerUtils';

interface ReqBody {
    password: string;
    email: string;
    username: string;
    activityMessage: string;
}

export enum CodeError {
}
export enum MessageError {
}


export abstract class UserUtils extends ControllerUtils {
    protected async transformBodyToUserForUpdate(body: ReqBody) : Promise<Models.User.IUser> {
        const user: Models.User.IUser = {};
        if ('email' in body) {
            await Tools.Mailer.checkEmailHasBadSyntax(body.email!);
            await Tools.Mailer.checkEmailIsTemporary(body.email!);
            user.email = body.email;
        }
        if ('username' in body) {
            await this.checkSyntaxUsername(body.username!);
            await this.checkLengthUsername(body.username!);
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
        return user;
    }
}

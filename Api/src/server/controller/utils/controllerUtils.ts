import * as Models from '../../model';
import * as DBQueries from '../../database';

export enum CodeError {
    GET_TOKEN_BY_REFLECT = 'ControllerUtils::getTokenByReflect',
    GET_USER_BY_REFLECT = 'ControllerUtils::getUserByReflect',
    CHECK_SYNTAX_USERNAME = 'ControllerUtils::checkSyntaxUsername',
    CHECK_LENGTH_USERNAME = 'ControllerUtils::checkLengthUsername',
    CHECK_LENGTH_PASSWORD = 'ControllerUtils::checkLengthPassword',
    CHECK_SYNTAX_PASSWORD = 'ControllerUtils::checkSyntaxPassword',
}

export enum MessageError {
    GET_TOKEN_BY_REFLECT = 'Token not found.',
    GET_USER_BY_REFLECT = 'User not found.',
    CHECK_SYNTAX_USERNAME = 'Username contains invalid characters. Has to be alphanumeric.',
    CHECK_LENGTH_USERNAME = 'Username length is too short or too long. (min: 4, max: 20)',
    CHECK_LENGTH_PASSWORD = 'Password length is too short or too long. (min: 6, max: 20)',
    CHECK_SYNTAX_PASSWORD = 'Password do contain one majuscule and one number minimum.',
}

export abstract class ControllerUtils {

    /** USER */
    protected async getUserByReflect(userReflect: Partial<Models.User.IUser>): Promise<Models.User.IUser> {
        const user: Models.User.IUser[] = await DBQueries.AccountQueries.getUser(userReflect);
        if (!user || user.length === 0)
            throw {
                code: CodeError.GET_USER_BY_REFLECT,
                message: MessageError.GET_USER_BY_REFLECT
            };
        return user[0] as Models.User.IUser;
    }

    protected async checkSyntaxUsername(username: string) {
        const regex = /^\w+$/;
        if (!regex.test(username))
            throw {
                code: CodeError.CHECK_SYNTAX_USERNAME,
                message: MessageError.CHECK_SYNTAX_USERNAME
            };
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
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
        if (!regex.test(password))
            throw {
                code: CodeError.CHECK_SYNTAX_PASSWORD,
                message: MessageError.CHECK_SYNTAX_PASSWORD
            };
    }

    /** TOKEN */

    protected async getTokenByReflect(tokenReflect: Partial<Models.User.IToken>): Promise<Models.User.IToken> {
        const token: Models.User.IToken[] = await DBQueries.AccountQueries.getToken(tokenReflect);
        if (!token || token.length === 0)
            throw {
                code: CodeError.GET_TOKEN_BY_REFLECT,
                message: MessageError.GET_TOKEN_BY_REFLECT
            };
        return token[0] as Models.User.IToken;
    }

}

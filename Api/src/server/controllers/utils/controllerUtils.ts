// import * as Models from '../../models';
// import * as DBQueries from '../../database';

import {MessageError} from '../../messageError';

export abstract class ControllerUtils {

    /** USER */
    // TODO peut être transformer en middleware mais pour la v2
    protected async checkSyntaxUsername(username: string) {
        const regex = /^\w+$/;
        if (!regex.test(username))
            throw {
                code: 'ControllerUtils::checkSyntaxUsername',
                message: MessageError.USER_CHECK_SYNTAX_USERNAME
            };
    }

    protected async checkLengthUsername(username: string) {
        if (username.length < 4 || username.length > 20)
            throw {
                code: 'ControllerUtils::checkLengthUsername',
                message: MessageError.USER_CHECK_LENGTH_USERNAME
            };
    }

    protected async checkLengthPassword(password: string) {
        if (password.length < 6 || password.length > 20)
            throw {
                code: 'ControllerUtils::checkLengthPassword',
                message: MessageError.USER_CHECK_LENGTH_PASSWORD
            };
    }

    protected async checkSyntaxPassword(password: string) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
        if (!regex.test(password))
            throw {
                code: 'ControllerUtils::checkSyntaxPassword',
                message: MessageError.USER_CHECK_SYNTAX_PASSWORD
            };
    }
}

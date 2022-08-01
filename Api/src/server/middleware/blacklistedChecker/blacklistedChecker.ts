import {Request} from 'express';
import * as Models from '../../model';
import * as DBQueries from '../../database';

export enum CodeError {
    USER_IS_BLACKLISTED = 'BlacklistedChecker::checkIsBlacklistedUser',
}

export enum MessageError {
    USER_IS_BLACKLISTED = 'User is blacklisted.',
}

export class BlacklistedChecker {
    public static async checkIsBlacklistedUser(req: Request) {
        try {
            const bearerToken = req.headers.authorization?.split(' ')[1] as string;
            const tokenFKUser: Models.User.ITokenFKUser[] = await DBQueries.UserQueries.getUserByFKToken({token: bearerToken});
            if (tokenFKUser[0]?.isBlackListed)
                throw {
                    code: CodeError.USER_IS_BLACKLISTED,
                    message: MessageError.USER_IS_BLACKLISTED
                }
        } catch (error) {
            throw error;
        }
    }
}

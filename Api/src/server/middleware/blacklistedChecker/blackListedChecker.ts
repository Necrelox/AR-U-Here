import {Request, Response, NextFunction} from 'express';
import {ITokenFKUser} from '../../models';
import {TokenModelQueries} from '../../database';
import {MessageError} from '../../messageError';

export async function blackListedChecker(req: Request, res: Response, next: NextFunction) {
    try {
        const bearerToken = req.headers.authorization?.split(' ')[1] as string;
        const tokenFKUser: Partial<ITokenFKUser>[] = await TokenModelQueries.getFKUser({
            token: bearerToken
        }, {
            isBlackListed: true
        });
        if (tokenFKUser[0]?.isBlackListed === true)
            throw {
                code: 'BlacklistedChecker::checkIsBlacklistedUser',
                message: MessageError.USER_IS_BLACKLISTED
            }
        next();
    } catch (error) {
        res.status(403).send({
            content: error
        });
    }
}


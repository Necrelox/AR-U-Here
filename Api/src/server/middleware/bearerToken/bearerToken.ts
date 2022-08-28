import {NextFunction, Request, Response} from 'express';
import {MessageError} from'../../messageError';
import {TokenModelQueries} from '../../database';
import {IToken} from '../../models';
import {Token} from '../../tools';

async function verifyExpiration(expiresAt: Date) {
    if (expiresAt < new Date())
        throw {
            code: 'BearerToken::verifyExpiration',
            message: MessageError.TOKEN_EXPIRED
        };
}

async function verifySignature(token: string) {
    if (!Token.signatureChecker(token))
        throw {
            code: 'BearerToken::verifySignature',
            message: MessageError.TOKEN_INVALID_SIGNATURE
        };
}

async function getExpireAt(bearerToken: string) : Promise<Date> {
    const token: Partial<IToken[]> = await TokenModelQueries.get({
        token: bearerToken
    }, {
        expireAt: true
    });
    if (!token || token.length === 0)
        throw {
            code: 'BearerToken::getExpireAt',
            message: MessageError.TOKEN_NOT_FOUND
        };
    return token[0]?.expireAt as Date;
}

async function checkIfAuthorizationExistAndNotEmpty(req: Request) {
    if (!('authorization' in req.headers)  || req.headers.authorization === undefined || req.headers.authorization === '')
        throw {
            code: 'BearerToken::checkIfAuthorizationExistAndNotEmpty',
            message: MessageError.TOKEN_NOT_GIVEN
        };
}

export async function bearerToken(req: Request, res: Response, next: NextFunction) {
    try {
        await checkIfAuthorizationExistAndNotEmpty(req);
        const bearerToken = req.headers.authorization?.split(' ')[1] as string;
        await Promise.all([
            verifySignature(bearerToken),
            verifyExpiration(await getExpireAt(bearerToken))
        ]);
        next();
    } catch (error) {
        res.status(401).send({
            content: error
        });
    }
}

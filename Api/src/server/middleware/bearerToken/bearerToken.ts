import {Request, Response, NextFunction} from "express";
import * as Tools from "../../tools";
import * as Models from "../../model";
import * as DBQueries from '../../database'
import {CodeError} from "./enum/codeError";
import {MessageError} from "./enum/messageError";

export class BearerToken {
    private static async getTokenByReflect(tokenReflect: string): Promise<Models.User.IToken> {
        const token: Models.User.IToken[] = await DBQueries.UserQuery.Token.select({token: tokenReflect});
        if (!token || token.length === 0)
            throw {
                code: CodeError.GET_TOKEN_BY_REFLECT,
                message: MessageError.TOKEN_NOT_FOUND
            }
        return token[0]!;
    }

    private static async verifyExpiration(token: Models.User.IToken) {
        if (token!.expireAt! < new Date())
            throw {
                code: CodeError.VERIFY_TOKEN_EXPIRATION,
                message: MessageError.TOKEN_EXPIRED
            };
    }

    private static async verifySignature(token: string) {
        if (!Tools.Token.signatureChecker(token))
            throw {
                code: CodeError.VERIFY_TOKEN_SIGNATURE,
                message: MessageError.TOKEN_INVALID_SIGNATURE
            };
    }

    public static async checkToken(req: Request, res: Response, next: NextFunction) {
        try {
            const bearerToken = (req.headers.authorization);
            await BearerToken.verifySignature(bearerToken!.split(' ')[1]!);
            const token: Models.User.IToken = await BearerToken.getTokenByReflect(bearerToken!.split(' ')[1]!);
            await BearerToken.verifyExpiration(token);
            next();
        } catch (error: any) {
            res.status(401).json({
                content: error
            });
        }
    }
}

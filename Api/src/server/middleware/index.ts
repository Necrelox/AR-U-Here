import {Request, Response, NextFunction} from 'express';
import {BearerToken} from "./bearerToken/bearerToken";
import {BlacklistedChecker} from "./blacklistedChecker/blacklistedChecker";


export class MiddlewareManager {
    public static async middlewares(req: Request, res: Response, next: NextFunction) {
        try {
            await BearerToken.checkToken(req);
            await BlacklistedChecker.checkIsBlacklistedUser(req);
            next();
        } catch (error) {
            res.status(401).send({
                content: error
            });
        }
    }
}

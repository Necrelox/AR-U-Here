import * as Models from "../../model";
import * as DBQueries from "../../database";
import {CodeError} from "./enum/codeError";
import {MessageError} from "./enum/messageError";

export abstract class ControllerUtils {

    /** USER */
    protected async updateUserByReflect(user: Models.User.IUser, userReflect: Models.User.IUser) {
        await DBQueries.UserQuery.User.update({uuid: user.uuid}, userReflect);
    }

    protected async getUserByReflect(userReflect: Models.User.IUser): Promise<Models.User.IUser> {
        const user: Models.User.IUser[] = await DBQueries.UserQuery.User.select(userReflect);
        if (!user || user.length === 0)
            throw {
                code: CodeError.GET_USER_BY_REFLECT,
                message: MessageError.GET_USER_BY_REFLECT
            }
        return user[0]!;
    }

    /** TOKEN */
    protected async getUserByFKTokenByBearerToken(bearerToken: string): Promise<Models.User.ITokenFKUser> {
        return (await DBQueries.UserQuery.Token.selectFK({token: bearerToken}))[0]!;
    }

    protected async getTokenByReflect(tokenReflect: Models.User.IToken): Promise<Models.User.IToken> {
        const token: Models.User.IToken[] = await DBQueries.UserQuery.Token.select(tokenReflect);
        if (!token || token.length === 0)
            throw {
                code: CodeError.GET_TOKEN_BY_REFLECT,
                message: MessageError.GET_TOKEN_BY_REFLECT
            }
        return token[0]!;
    }

}

import * as Models from '../../../model';
import * as DBQueries from '../../../database';
import * as Tools from '../../../tools';
import {CodeError} from '../enum/codeError';
import {MessageError} from "../enum/messageError";
import {ControllerUtils} from "../../utils/controllerUtils";

export abstract class AccountUtils extends ControllerUtils {

    /** ------- POST ------- */
    protected async transformPostBodyToUserReflect(postBody: Models.User.IUser): Promise<Models.User.IUser> {
        const userReflect: Models.User.IUser = {};
        if (postBody.email)
            userReflect.email = postBody.email;
        if (postBody.username)
            userReflect.username = postBody.username;
        return userReflect;
    }

    protected async checkPostContainMailORUsernameANDPassword(postData: any) {
        if ((!postData.email && !postData.username) || !postData.password)
            throw {
                code: CodeError.CHECK_POST_CONTAIN_MAIL_OR_USERNAME_AND_PASSWORD,
                message: MessageError.MISSING_PARAMETER + (postData.email ? '' : ' email') + (postData.username ? '' : ' username') + (postData.password ? '' : ' password') + '.'
            };
    }

    protected async checkPostContainMailANDUserANDPassword(postData: any) {
        if (!postData.email || !postData.username || !postData.password)
            throw {
                code: CodeError.CHECK_POST_CONTAIN_MAIL_AND_USERNAME_AND_PASSWORD,
                message: MessageError.MISSING_PARAMETER + (postData.email ? '' : " email") + (postData.username ? '' : ' username') + (postData.password ? '' : ' password') + '.'
            };
    }

    protected async checkPostContainIpANDMacAddressANDDeviceType(postData: any) {
        if (!postData.ip || !postData.macAddress || !postData.deviceType)
            throw {
                code: CodeError.CHECK_POST_CONTAIN_IP_AND_MACADDRESS_AND_DEVICE_TYPE,
                message: MessageError.MISSING_PARAMETER + (postData.ip ? '' : ' ip') + (postData.macAddress ? '' : ' macAddress') + (postData.deviceType ? '' : ' deviceType') + '.'
            }
    }

    /** ----- ACCOUNT ------ */

    protected async setVerifyUser(token: Models.User.IToken) {
        const user: Models.User.IUser = await this.getUserByReflect({uuid: token?.userUuid});
        if (user!.isVerified)
            throw {
                code: CodeError.SET_VERIFY_USER,
                message: MessageError.USER_ALREADY_VERIFIED
            };
        else {
            await DBQueries.UserQuery.User.update({uuid: user.uuid}, {isVerified: true});
            await DBQueries.UserQuery.Token.delete({uuid: token?.uuid});
        }
    }

    protected async checkSyntaxUsername(username: string) {
        const regex: RegExp = /^\w+$/;
        if (!regex.test(username))
            throw {
                code: CodeError.CHECK_SYNTAXE_USERNAME,
                message: MessageError.USERNAME_BAD_SYNTAX
            }
    }

    protected async checkLengthUsername(username: string) {
        if (username.length < 4 || username.length > 20)
            throw {
                code: CodeError.CHECK_LENGTH_USERNAME,
                message: MessageError.USERNAME_LENGTH_BAD
            };
    }

    protected async checkLengthPassword(password: string) {
        if (password.length < 6 || password.length > 20)
            throw {
                code: CodeError.CHECK_LENGTH_PASSWORD,
                message: MessageError.PASSWORD_LENGTH_BAD
            };
    }

    protected async checkSyntaxPassword(password: string) {
        const regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
        if (!regex.test(password))
            throw {
                code: CodeError.CHECK_SYNTAXE_PASSWORD,
                message: MessageError.PASSWORD_BAD_SYNTAX
            }
    }

    protected async checkUserPassword(passwordToCheck: string, passwordOfUser: Buffer) {
        if (!Tools.PasswordEncrypt.compare(passwordToCheck, passwordOfUser))
            throw {
                code: CodeError.CHECK_USER_PASSWORD,
                message: MessageError.INVALID_PASSWORD
            };
    }

    protected async checkUserIsBlacklisted(user: Models.User.IUser) {
        if (user!.isBlackListed)
            throw {
                code: CodeError.CHECK_USER_IS_BLACKLISTED,
                message: MessageError.USER_IS_BLACKLISTED
            };
    }

    protected async checkUserIsVerified(user: Models.User.IUser) {
        if (!user.isVerified)
            throw {
                code: CodeError.CHECK_USER_IS_VERIFIED,
                message: MessageError.USER_NOT_VERIFIED
            };
    }

    protected async verifyLoginAndReturnUser(searchUser: Models.User.IUser, password: string): Promise<Models.User.IUser> {
        const user: Models.User.IUser[] = await DBQueries.UserQuery.User.select(searchUser);
        if (!user || user.length === 0)
            throw {
                code: CodeError.VERIFY_LOGIN_AND_RETURN_USER,
                message: searchUser?.username ? "Invalid username" : "Invalid email"
            };

        await this.checkUserPassword(password, user[0]!.password!);
        await this.checkUserIsVerified(user[0]!);
        await this.checkUserIsBlacklisted(user[0]!);
        return user[0]!;
    }

    protected async createUser(user: Models.User.IUser) {
        await DBQueries.UserQuery.User.insert({
                username: user.username,
                email: user.email,
                password: user.password!,
            });
    }

    protected async addNewIpOrUpdate(user: Models.User.IUser, ip: string) {
        const userIP: Models.User.IIP[] = await DBQueries.UserQuery.Ip.select({
            ip: ip,
            userUuid: user.uuid
        });
        if (!userIP || userIP.length === 0) {
            await DBQueries.UserQuery.Ip.insert({
                ip,
                userUuid: user?.uuid,
                active: true
            });
        } else {
            await DBQueries.UserQuery.Ip.update({
                ip,
                userUuid: user?.uuid,
            }, {active: true});
        }
    }

    protected async addNewMacAddressOrUpdate(user: Models.User.IUser, macAddress: string) {
        const userMacAddress: Models.User.IUser[] = await DBQueries.UserQuery.Macaddress.select({
            macAddress,
            userUuid: user!.uuid
        });
        if (!userMacAddress || userMacAddress.length === 0) {
            await DBQueries.UserQuery.Macaddress.insert({
                macAddress,
                userUuid: user.uuid,
                active: true
            });
        } else {
            await DBQueries.UserQuery.Macaddress.update({
                macAddress,
                userUuid: user.uuid,
            }, {active: true});
        }
    }

    protected async addNewDeviceOrUpdate(user: Models.User.IUser, device: string) {
        const userDevice: Models.User.IDevice[] = await DBQueries.UserQuery.Device.select({
            device,
            userUuid: user.uuid
        });
        if (!userDevice || userDevice.length === 0) {
            await DBQueries.UserQuery.Device.insert({
                device,
                userUuid: user.uuid,
                active: true
            });
        } else {
            await DBQueries.UserQuery.Device.update({
                device,
                userUuid: user.uuid,
            }, {active: true});
        }
    }

    /** ------- EMAIL -------- */
    protected async sendEmailVerification(user: Models.User.IUser, token: Models.User.IToken) {
        await Tools.Mailer.sendMail({
            from: process.env.EMAIL_AUTH_USER,
            to: user?.email!,
            subject: "Confirmation de votre compte",
            text: "Veuillez confirmer votre compte en cliquant sur le lien suivant : $$$$$ " + token?.token
        });
    }


    /** ------- TOKEN -------- */
    protected async verifyTokenExpirationAndSendMail(token: Models.User.IToken) {
        if (token?.expireAt! < new Date()) {
            await this.createToken({uuid: token!.userUuid});
            // const newToken : SzBxModel.User.IToken[] = await this.getTokenBySearch({userUuid: token?.userUuid});
            // const user: SzBxModel.User.User[] = await SzBxModel.User.User.select({uuid: token?.userUuid});
            // await this.sendEmailVerification(user[0]!, newToken[0]!);

            throw {
                code: CodeError.VERIFY_TOKEN_EXPIRATION_AND_SEND_MAIL,
                message: MessageError.TOKEN_EXPIRED
            };
        }
    }

    protected async verifyTokenSignature(token: string) {
        if (!Tools.Token.signatureChecker(token))
            throw {
                code: CodeError.VERIFY_TOKEN_SIGNATURE,
                message: MessageError.TOKEN_INVALID_SIGNATURE
            };
    }

    protected async createToken(user: Models.User.IUser) {
        await DBQueries.UserQuery.Token.delete({userUuid: user?.uuid});
        await DBQueries.UserQuery.Token.insert({
            token: Tools.Token.generateToken(user?.uuid!),
            userUuid: user?.uuid,
            expireAt: new Date(Date.now() + (1000 * 60 * 60))
        });
    }

}

import * as Models from '../../../model';
import * as DBQueries from '../../../database';
import * as Tools from '../../../tools';
import {ControllerUtils} from '../../utils/controllerUtils';

enum MessageError {
    CHECK_POST_CONTAIN_MAIL_OR_USERNAME_AND_PASSWORD = 'Missing parameter.',
    CHECK_POST_CONTAIN_MAIL_AND_USERNAME_AND_PASSWORD = 'Missing parameter.',
    CHECK_POST_CONTAIN_IP_AND_MACADDRESS_AND_DEVICE_TYPE = 'Missing parameter.',
    CHECK_USER_PASSWORD = 'Invalid password.',
    CHECK_USER_IS_BLACKLISTED = 'User is blacklisted.',
    CHECK_USER_IS_VERIFIED = 'User not verified.',
    VERIFY_TOKEN_EXPIRATION_AND_SEND_MAIL = 'Token expired, new token generated.',
    TOKEN_INVALID_SIGNATURE = 'Token invalid signature.',
}

enum CodeError {
    CHECK_POST_CONTAIN_MAIL_OR_USERNAME_AND_PASSWORD = 'AccountUtils::checkPostContainMailORUsernameANDPassword',
    CHECK_POST_CONTAIN_MAIL_AND_USERNAME_AND_PASSWORD = 'AccountUtils:checkPostContainMailANDUserANDPassword',
    CHECK_POST_CONTAIN_IP_AND_MACADDRESS_AND_DEVICE_TYPE = 'AccountUtils::checkPostContainIpANDMacAddressANDDeviceType',
    CHECK_USER_PASSWORD = 'AccountUtilsError:checkUserPassword',
    CHECK_USER_IS_BLACKLISTED = 'AccountUtils:checkUserIsBlacklisted',
    CHECK_USER_IS_VERIFIED = 'AccountUtils:checkUserIsVerified',
    VERIFY_LOGIN_AND_RETURN_USER = 'AccountUtilsError:verifyLoginAndReturnUser',
    VERIFY_TOKEN_EXPIRATION_AND_SEND_MAIL = 'AccountUtils::verifyTokenExpirationAndSendMail',
    VERIFY_TOKEN_SIGNATURE = 'AccountUtils::verifyTokenSignature',
}

export abstract class AccountUtils extends ControllerUtils {

    /** ------- POST ------- */
    protected async transformPostBodyToUserReflect(postBody: {email ?: string, username?: string}): Promise<Partial<Models.User.IUser>> {
        const userReflect: Partial<Models.User.IUser> = {};
        if (postBody.email)
            userReflect.email = postBody.email;
        if (postBody.username)
            userReflect.username = postBody.username;
        return userReflect;
    }

    protected async checkPostContainMailORUsernameANDPassword(postData: { email?: string, username?: string, password?: string }) {
        if ((!postData.email && !postData.username) || !postData.password)
            throw {
                code: CodeError.CHECK_POST_CONTAIN_MAIL_OR_USERNAME_AND_PASSWORD,
                message: MessageError.CHECK_POST_CONTAIN_MAIL_OR_USERNAME_AND_PASSWORD + (postData.email ? '' : ' email') + (postData.username ? '' : ' username') + (postData.password ? '' : ' password') + '.'
            };
    }

    protected async checkPostContainMailANDUserANDPassword(postData: { email?: string, username?: string, password?: string }) {
        if (!postData.email || !postData.username || !postData.password)
            throw {
                code: CodeError.CHECK_POST_CONTAIN_MAIL_AND_USERNAME_AND_PASSWORD,
                message: MessageError.CHECK_POST_CONTAIN_MAIL_AND_USERNAME_AND_PASSWORD + (postData.email ? '' : ' email') + (postData.username ? '' : ' username') + (postData.password ? '' : ' password') + '.'
            };
    }

    protected async checkPostContainIpANDMacAddressANDDeviceType(postData: { ip?: string, macAddress?: string, deviceType?: string }) {
        if (!postData.ip || !postData.macAddress || !postData.deviceType)
            throw {
                code: CodeError.CHECK_POST_CONTAIN_IP_AND_MACADDRESS_AND_DEVICE_TYPE,
                message: MessageError.CHECK_POST_CONTAIN_IP_AND_MACADDRESS_AND_DEVICE_TYPE + (postData.ip ? '' : ' ip') + (postData.macAddress ? '' : ' macAddress') + (postData.deviceType ? '' : ' deviceType') + '.'
            };
    }

    /** ----- ACCOUNT ------ */

    protected async checkUserPassword(passwordToCheck: string, passwordOfUser: Buffer) {
        if (!Tools.PasswordEncrypt.compare(passwordToCheck, passwordOfUser))
            throw {
                code: CodeError.CHECK_USER_PASSWORD,
                message: MessageError.CHECK_USER_PASSWORD
            };
    }

    protected async checkUserIsBlacklisted(user: Models.User.IUser) {
        if (user.isBlackListed)
            throw {
                code: CodeError.CHECK_USER_IS_BLACKLISTED,
                message: MessageError.CHECK_USER_IS_BLACKLISTED
            };
    }

    protected async checkUserIsVerified(user: Models.User.IUser) {
        if (!user.isVerified)
            throw {
                code: CodeError.CHECK_USER_IS_VERIFIED,
                message: MessageError.CHECK_USER_IS_VERIFIED
            };
    }

    protected async verifyUserPasswordAndVerifiedAndBlacklistedAndReturnUser(userReflectToFind: Partial<Models.User.IUser>, password: string): Promise<Models.User.IUser> {
        const user: Models.User.IUser[] = await DBQueries.AccountQueries.getUser(userReflectToFind);
        if (!user || user.length === 0)
            throw {
                code: CodeError.VERIFY_LOGIN_AND_RETURN_USER,
                message: userReflectToFind?.username ? 'Invalid username' : 'Invalid email'
            };

        await Promise.all([
            this.checkUserPassword(password, user[0]?.password as Buffer),
            this.checkUserIsVerified(user[0] as Models.User.IUser),
            this.checkUserIsBlacklisted(user[0] as Models.User.IUser)
        ]);
        return user[0] as Models.User.IUser;
    }

    /** ------- EMAIL -------- */
    protected async sendEmailVerification(user: Models.User.IUser, token: Models.User.IToken) {
        await Tools.Mailer.sendMail({
            from: process.env.EMAIL_AUTH_USER,
            to: user.email,
            subject: 'Confirmation de votre compte',
            text: 'Veuillez confirmer votre compte en cliquant sur le lien suivant : $$$$$ ' + token.token
        });
    }

    /** ------- TOKEN -------- */
    protected async verifyTokenExpirationAndSendMail(token: Models.User.IToken) {
        if (token.expireAt < new Date()) {
            await this.createToken({uuid: token.userUuid});
            // const newToken : SzBxModel.User.IToken[] = await this.getTokenBySearch({userUuid: token?.userUuid});
            // const user: SzBxModel.User.User[] = await SzBxModel.User.User.select({uuid: token?.userUuid});
            // await this.sendEmailVerification(user[0], newToken[0]);

            throw {
                code: CodeError.VERIFY_TOKEN_EXPIRATION_AND_SEND_MAIL,
                message: MessageError.VERIFY_TOKEN_EXPIRATION_AND_SEND_MAIL
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

    protected async createToken(user: Partial<Models.User.IUser>) {
        await DBQueries.UserQueries.deleteToken({userUuid: user.uuid});
        await DBQueries.UserQueries.addToken({
            token: Tools.Token.generateToken(user.uuid as Buffer),
            userUuid: user.uuid,
            expireAt: new Date(Date.now() + (1000 * 60 * 60))
        });
    }

}

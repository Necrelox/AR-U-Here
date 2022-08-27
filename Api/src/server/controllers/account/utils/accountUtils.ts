import {PasswordEncrypt} from '../../../tools';
import {ControllerUtils} from '../../utils/controllerUtils';

import {IUser} from '../../../models';
import {UserModelQueries} from '../../../database';
import {MessageError} from '../../../messageError';

export abstract class AccountUtils extends ControllerUtils {

    /** ------- POST ------- */
    protected async checkPostContainMailANDUserANDPassword(postData: { email?: string, username?: string, password?: string }) {
        if (!postData.email || !postData.username || !postData.password)
            throw {
                code: 'AccountUtils::checkPostContainMailANDUserANDPassword',
                message: MessageError.MISSING_PARAMETER + (postData.email ? '' : ' email') + (postData.username ? '' : ' username') + (postData.password ? '' : ' password') + '.'
            };
    }

    protected async checkPostContainMailORUsernameANDPassword(postData: { email?: string, username?: string, password?: string }) {
        if ((!postData.email && !postData.username) || !postData.password)
            throw {
                code: 'AccountUtils::checkPostContainMailORUsernameANDPassword',
                message: MessageError.MISSING_PARAMETER + (postData.email ? '' : ' email') + (postData.username ? '' : ' username') + (postData.password ? '' : ' password') + '.'
            };
    }

    protected async checkPostContainIpANDMacAddressANDDeviceType(postData: { ip?: string, macAddress?: string, deviceType?: string }) {
        if (!postData.ip || !postData.macAddress || !postData.deviceType)
            throw {
                code: 'AccountUtils::checkPostContainIpANDMacAddressANDDeviceType',
                message: MessageError.MISSING_PARAMETER + (postData.ip ? '' : ' ip') + (postData.macAddress ? '' : ' macAddress') + (postData.deviceType ? '' : ' deviceType') + '.'
            };
    }

    /** ----- ACCOUNT ------ */

    protected async checkUserPassword(passwordToCheck: string, passwordOfUser: Buffer) {
        if (!PasswordEncrypt.compare(passwordToCheck, passwordOfUser))
            throw {
                code: 'AccountUtils::checkUserPassword',
                message: MessageError.USER_INVALID_PASSWORD
            };
    }

    protected async checkUserIsBlacklisted(isBlackListed: boolean) {
        if (isBlackListed)
            throw {
                code: 'AccountUtils::checkUserIsBlacklisted',
                message: MessageError.USER_IS_BLACKLISTED
            };
    }

    protected async checkUserIsVerified(isVerified: boolean) {
        if (!isVerified)
            throw {
                code: 'AccountUtils::checkUserIsVerified',
                message: MessageError.USER_NOT_VERIFIED
            };
    }

    protected async verifyUserPasswordAndVerifiedAndBlacklistedAndReturnUser(userReflectToFind: Partial<IUser>, password: string): Promise<Partial<IUser>> {
        const user: Partial<IUser>[] = await UserModelQueries.get(
            userReflectToFind.hasOwnProperty('email') ?
                {email: userReflectToFind.email} : {username: userReflectToFind.username},
            {
                password: true,
                isBlackListed: true,
                isVerified: true,
                uuid: true,
            });
        if (!user || user.length === 0)
            throw {
                code: 'AccountUtils::verifyUserPasswordAndVerifiedAndBlacklistedAndReturnUser',
                message: userReflectToFind?.username ? 'Invalid username' : 'Invalid email'
            };
        await Promise.all([
            this.checkUserPassword(password, user[0]?.password as Buffer),
            this.checkUserIsVerified(user[0]?.isVerified as boolean),
            this.checkUserIsBlacklisted(user[0]?.isBlackListed as boolean)
        ]);
        return user[0] as Partial<IUser>;
    }

    /** ------- EMAIL -------- */
    // protected async sendEmailVerification(user: IUser, token: IToken) {
    //     await Tools.Mailer.sendMail({
    //         from: process.env.EMAIL_AUTH_USER,
    //         to: user.email,
    //         subject: 'Confirmation de votre compte',
    //         text: 'Veuillez confirmer votre compte en cliquant sur le lien suivant : $$$$$ ' + token.token
    //     });
    // }
}

import * as Models from '../../../../model';
import {ControllerUtils} from '../../../utils/controllerUtils';

interface ReqBody {
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    studyLevel: number;
    uuid: Buffer;
}

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
    CHECK_POST_CONTAIN_MAIL_AND_USERNAME_AND_PASSWORD = 'AccountUtils:checkPostContainNameANDStartANDEndTime',
    CHECK_POST_CONTAIN_IP_AND_MACADDRESS_AND_DEVICE_TYPE = 'AccountUtils::checkPostContainIpANDMacAddressANDDeviceType',
    CHECK_USER_PASSWORD = 'AccountUtilsError:checkUserPassword',
    CHECK_USER_IS_BLACKLISTED = 'AccountUtils:checkUserIsBlacklisted',
    CHECK_USER_IS_VERIFIED = 'AccountUtils:checkUserIsVerified',
    VERIFY_LOGIN_AND_RETURN_USER = 'AccountUtilsError:verifyLoginAndReturnUser',
    VERIFY_TOKEN_EXPIRATION_AND_SEND_MAIL = 'AccountUtils::verifyTokenExpirationAndSendMail',
    VERIFY_TOKEN_SIGNATURE = 'AccountUtils::verifyTokenSignature',
}

export abstract class ActivityUtils extends ControllerUtils {

    /** USER */
    protected async transformBodyToUserForUpdate(body: ReqBody) : Promise<Partial<Models.User.IUser>> {
        const user: Partial<Models.User.IUser> = {};
        const b: ReqBody = body;
        console.log(b);
        return user;
    }

    protected async checkPostContainNameANDStartANDEndTime(postData: { name?: string, startTime?: Date, endTime?: Date }) {
        if (!postData.name || !postData.startTime || !postData.endTime)
            throw {
                code: CodeError.CHECK_POST_CONTAIN_MAIL_AND_USERNAME_AND_PASSWORD,
                message: MessageError.CHECK_POST_CONTAIN_MAIL_AND_USERNAME_AND_PASSWORD + (postData.name ? '' : ' name') + (postData.startTime ? '' : ' startTime') + (postData.endTime ? '' : ' endTime') + '.'
            };
    }
}

import {ControllerUtils} from '../../../utils/controllerUtils';
import {MessageError} from '../../../../messageError';
import {ITokenFKUser} from "../../../../models";
import {TokenModelQueries} from "../../../../database";

export abstract class ActivityUserUtils extends ControllerUtils {

    protected async checkRolePermission(bearerToken: string) {
        const tokenFkUser: Partial<ITokenFKUser>[] = await TokenModelQueries.getFKUser({
            token: bearerToken
        }, {
            role: true
        });
        if (!tokenFkUser || tokenFkUser.length === 0)
            throw {
                code: 'ActivityUtils::checkRolePermission',
                message: MessageError.TOKEN_FK_USER_NOT_FOUND
            };
        if (tokenFkUser[0]?.role !== 'professor')
            throw {
                code: 'ActivityUtils::checkRolePermission',
                message: MessageError.USER_HAS_NOT_PERMISSION
            };
    }

    protected async checkRequestContainBothParams(postData: { username?: string, activityKey?: string}) {
        if (!postData.username || !postData.activityKey )
            throw {
                code: 'ActivityUserUtils::checkRequestContainBothParams',
                message: MessageError.MISSING_PARAMETER + (postData.username ? '' : ' username') + (postData.activityKey ? '' : ' activityKey')
            };
    }
}

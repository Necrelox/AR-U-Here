import {ControllerUtils} from '../../../utils/controllerUtils';
import {MessageError} from '../../../../messageError';
import {IActivity, ITokenFKUser} from '../../../../models';
import {TokenModelQueries, ActivityModelQueries} from '../../../../database';

export abstract class ActivityUtils extends ControllerUtils {

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

    /** USER */
    protected async checkPostContainActivityKeyANDNameANDStartANDEndTime(postData: { activityKey?: string, name?: string, startTime?: Date, endTime?: Date }) {
        if (!postData.name || !postData.startTime || !postData.endTime || !postData.activityKey)
            throw {
                code: 'ActivityUtils::checkPostContainActivityKeyANDNameANDStartANDEndTime',
                message: MessageError.MISSING_PARAMETER +
                (postData.name ? '' : ' name') + (postData.startTime ? '' : ' startTime')
                + (postData.endTime ? '' : ' endTime') + (postData.startTime ? '' : ' activityKey') + '.'
            };
    }

    protected async checkRequestContainActivityKey(postData: { activityKey?: string}) {
        if (!postData.activityKey)
            throw {
                code: 'ActivityUtils::checkRequestContainActivityKey',
                message: MessageError.MISSING_PARAMETER + (postData.activityKey ? '' : ' activityKey')
            };
    }

    protected async getActivity(activityReflect: Partial<IActivity>) {
        const activities: Partial<IActivity>[] = await ActivityModelQueries.get(activityReflect, {});
        if (!activities || activities.length === 0)
            throw {
                code: 'ActivityUtils::getActivity',
                message: MessageError.ACTIVITY_NOT_FOUND
            };
        return activities;
    }
}

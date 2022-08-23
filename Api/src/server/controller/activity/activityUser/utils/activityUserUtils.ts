import {ControllerUtils} from '../../../utils/controllerUtils';

enum MessageError {
    CHECK_POST_CONTAIN_BOTH_UUIDS = 'Missing parameter.',
}

enum CodeError {
    CHECK_POST_CONTAIN_BOTH_UUIDS = 'AbsenceUtils:checkRequestContainBothUuids',
}

export abstract class ActivityUserUtils extends ControllerUtils {

    protected async checkRequestContainBothParams(postData: { userUserName?: string, activityActivityKey?: string}) {
        if (!postData.userUserName || !postData.activityActivityKey )
            throw {
                code: CodeError.CHECK_POST_CONTAIN_BOTH_UUIDS,
                message: MessageError.CHECK_POST_CONTAIN_BOTH_UUIDS + (postData.userUserName ? '' : ' userUserName') + (postData.activityActivityKey ? '' : ' activityActivityKey')
            };
    }
}
import {ControllerUtils} from '../../../utils/controllerUtils';

enum MessageError {
    CHECK_POST_CONTAIN_BOTH_UUIDS = 'Missing parameter.',
}

enum CodeError {
    CHECK_POST_CONTAIN_BOTH_UUIDS = 'AbsenceUtils:checkRequestContainBothUuids',
}

export abstract class ActivityUserUtils extends ControllerUtils {

    protected async checkRequestContainBothUuids(postData: { userUuid?: string, activityUuid?: string}) {
        if (!postData.userUuid || !postData.activityUuid )
            throw {
                code: CodeError.CHECK_POST_CONTAIN_BOTH_UUIDS,
                message: MessageError.CHECK_POST_CONTAIN_BOTH_UUIDS + (postData.userUuid ? '' : ' userUuid') + (postData.activityUuid ? '' : ' activityUuid')
            };
    }
}
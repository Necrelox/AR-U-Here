import * as Models from '../../../../models';
import {ControllerUtils} from '../../../utils/controllerUtils';

interface ReqBody {
    delayInMinutes: number;
    justification: string;
    acceptedJustification: boolean;
    attendedActivity: boolean;
    activityUserUuid: Buffer;
    uuid: Buffer;
}

enum MessageError {
    CHECK_POST_CONTAIN_BOTH_UUIDS = 'Missing parameter.',
}

enum CodeError {
    CHECK_POST_CONTAIN_BOTH_UUIDS = 'AbsenceUtils:checkRequestContainBothUuids',
}

export abstract class DelayUtils extends ControllerUtils {
    protected async transformBodyToDelayForUpdate(body: ReqBody) : Promise<Partial<Models.User.IUser>> {
        const delay: Partial<Models.Activity.IDelay> = {};
        if ('delayInMinutes' in body) {
            delay.delayInMinutes = body.delayInMinutes;
        }
        if ('justification' in body) {
            delay.justification = body.justification;
        }
        if ('acceptedJustification' in body) {
            delay.acceptedJustification = body.acceptedJustification;
        }
        if ('activityUserUuid' in body) {
            delay.activityUserUuid = body.activityUserUuid;
        }
        return delay;
    }

    protected async checkRequestContainBothParams(postData: { username?: string, activityKey?: string}) {
        if (!postData.username || !postData.activityKey )
            throw {
                code: CodeError.CHECK_POST_CONTAIN_BOTH_UUIDS,
                message: MessageError.CHECK_POST_CONTAIN_BOTH_UUIDS + (postData.username ? '' : ' username') + (postData.activityKey ? '' : ' activityKey')
            };
    }

    protected async checkRequestContainUsername(postData: { username?: string}) {
        if (!postData.username)
            throw {
                code: CodeError.CHECK_POST_CONTAIN_BOTH_UUIDS,
                message: MessageError.CHECK_POST_CONTAIN_BOTH_UUIDS + (postData.username ? '' : ' username')
            };
    }

    protected async checkRequestContainActivityKey(postData: { activityKey?: string}) {
        if (!postData.activityKey)
            throw {
                code: CodeError.CHECK_POST_CONTAIN_BOTH_UUIDS,
                message: MessageError.CHECK_POST_CONTAIN_BOTH_UUIDS + (postData.activityKey ? '' : ' activityKey')
            };
    }
}

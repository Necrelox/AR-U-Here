import * as Models from '../../../../model';
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

    protected async checkRequestContainBothUuids(postData: { userUuid?: string, activityUuid?: string}) {
        if (!postData.userUuid || !postData.activityUuid )
            throw {
                code: CodeError.CHECK_POST_CONTAIN_BOTH_UUIDS,
                message: MessageError.CHECK_POST_CONTAIN_BOTH_UUIDS + (postData.userUuid ? '' : ' userUuid') + (postData.activityUuid ? '' : ' activityUuid')
            };
    }
}
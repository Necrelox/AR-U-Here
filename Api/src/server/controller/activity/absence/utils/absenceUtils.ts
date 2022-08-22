import * as Models from '../../../../model';
import {ControllerUtils} from '../../../utils/controllerUtils';

interface ReqBody {
    justification: string;
    acceptedJustification: boolean;
    activityUserUuid: Buffer;
    uuid: Buffer;
}

enum MessageError {
    CHECK_POST_CONTAIN_BOTH_UUIDS = 'Missing parameter.',
}

enum CodeError {
    CHECK_POST_CONTAIN_BOTH_UUIDS = 'AbsenceUtils:checkRequestContainBothUuids',
}

export abstract class AbsenceUtils extends ControllerUtils {
    /** ABSENCE */
    protected async transformBodyToAbsenceForUpdate(body: ReqBody) : Promise<Partial<Models.Activity.IAbsence>> {
        const absence: Partial<Models.Activity.IAbsence> = {};
        if ('justification' in body) {
            absence.justification = body.justification;
        }
        if ('acceptedJustification' in body) {
            absence.acceptedJustification = body.acceptedJustification;
        }
        if ('activityUserUuid' in body) {
            absence.activityUserUuid = body.activityUserUuid;
        }
        return absence;
    }
    
    protected async checkRequestContainBothUuids(postData: { userUuid?: string, activityUuid?: string}) {
        if (!postData.userUuid || !postData.activityUuid )
            throw {
                code: CodeError.CHECK_POST_CONTAIN_BOTH_UUIDS,
                message: MessageError.CHECK_POST_CONTAIN_BOTH_UUIDS + (postData.userUuid ? '' : ' userUuid') + (postData.activityUuid ? '' : ' activityUuid')
            };
    }
}
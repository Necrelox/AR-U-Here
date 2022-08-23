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
    CHECK_POST_CONTAIN_UUID = 'Missing parameter.',
    CHECK_POST_CONTAIN_BOTH_UUIDS = 'Missing parameter.',
    CHECK_POST_CONTAIN_NAME_AND_START_AND_ENDTIME = 'Missing parameter.',
}

enum CodeError {
    CHECK_POST_CONTAIN_BOTH_UUIDS = 'AbsenceUtils:checkRequestContainBothUuids',
    CHECK_POST_CONTAIN_UUID = 'ActivityUtils:checkRequestContainUuid',
    CHECK_POST_CONTAIN_NAME_AND_START_AND_ENDTIME = 'ActivityUtils:checkPostContainNameANDStartANDEndTime',
}

export abstract class ActivityUtils extends ControllerUtils {

    /** USER */
    protected async transformBodyToActivityForUpdate(body: ReqBody) : Promise<Partial<Models.Activity.IActivity>> {
        const activity: Partial<Models.Activity.IActivity> = {};
        if ('name' in body) {
            activity.name = body.name;
        }
        if ('description' in body) {
            activity.description = body.description;
        }
        if ('startTime' in body) {
            activity.startTime = body.startTime;
        }
        if ('endTime' in body) {
            activity.endTime = body.endTime;
        }
        if ('studyLevel' in body) {
            activity.studyLevel = body.studyLevel;
        }
        return activity;
    }

    protected async checkPostContainActivityKeyANDNameANDStartANDEndTime(postData: { activityKey?: string, name?: string, startTime?: Date, endTime?: Date }) {
        if (!postData.name || !postData.startTime || !postData.endTime || !postData.activityKey)
            throw {
                code: CodeError.CHECK_POST_CONTAIN_NAME_AND_START_AND_ENDTIME,
                message: MessageError.CHECK_POST_CONTAIN_NAME_AND_START_AND_ENDTIME +
                (postData.name ? '' : ' name') + (postData.startTime ? '' : ' startTime')
                + (postData.endTime ? '' : ' endTime') + (postData.startTime ? '' : ' activityKey') + '.'
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
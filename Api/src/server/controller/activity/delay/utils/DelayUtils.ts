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


export abstract class DelayUtils extends ControllerUtils {

    protected async transformBodyToDelayForUpdate(body: ReqBody) : Promise<Partial<Models.User.IUser>> {
        const delay: Partial<Models.Activity.IDelay> = {};
        delay.delayInMinutes = body.delayInMinutes;
        delay.justification = body.justification;
        delay.acceptedJustification = body.acceptedJustification;
        delay.attendedActivity = body.attendedActivity;
        delay.activityUserUuid = body.activityUserUuid;
        return delay;
    }
}

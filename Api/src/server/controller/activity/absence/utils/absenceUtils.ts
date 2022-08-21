import * as Models from '../../../../model';
import {ControllerUtils} from '../../../utils/controllerUtils';

interface ReqBody {
    justification: string;
    acceptedJustification: boolean;
    activityUserUuid: Buffer;
    uuid: Buffer;
}


export abstract class AbsenceUtils extends ControllerUtils {

    /** USER */
    protected async transformBodyToAbsenceForUpdate(body: ReqBody) : Promise<Partial<Models.Activity.IAbsence>> {
        const absence: Partial<Models.Activity.IAbsence> = {};
        absence.justification = body.justification;
        absence.acceptedJustification = body.acceptedJustification;
        absence.activityUserUuid = body.activityUserUuid;
        return absence;
    }
}

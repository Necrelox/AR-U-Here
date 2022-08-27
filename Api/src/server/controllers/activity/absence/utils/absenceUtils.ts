import {ControllerUtils} from '../../../utils/controllerUtils';
import {MessageError} from '../../../../messageError';

export abstract class AbsenceUtils extends ControllerUtils {
    /** ABSENCE */

    protected async checkRequestContainBothParams(postData: { username?: string, activityKey?: string}) {
        if (!postData.activityKey)
            throw {
                code: 'Absence::checkRequestContainBothParams',
                message: MessageError.MISSING_PARAMETER
            };
    }
}

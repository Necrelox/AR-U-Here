import * as Models from '../../../../model';
import {ControllerUtils} from '../../../utils/controllerUtils';

interface ReqBody {
    password: string;
    email: string;
    username: string;
    activityMessage: string;
    address: string;
    phone: string;
}


export abstract class ActivityUtils extends ControllerUtils {

    /** USER */
    protected async transformBodyToUserForUpdate(body: ReqBody) : Promise<Partial<Models.User.IUser>> {
        const user: Partial<Models.User.IUser> = {};
        const b: ReqBody = body;
        console.log(b);
        return user;
    }
}

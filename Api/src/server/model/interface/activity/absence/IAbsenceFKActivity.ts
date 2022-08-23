import {IAbsence as _IAbsence} from './IAbsence';
import {IActivity as _IActivity} from '../IActivity';
import {IActivityUser as _IActivityUser} from '../activityUser/IActivityUser';

export interface IAbsenceFKActivity extends _IAbsence, _IActivity, _IActivityUser {}
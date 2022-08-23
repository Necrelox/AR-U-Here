import {IDelay as _IDelay} from './IDelay';
import {IActivity as _IActivity} from '../IActivity';
import {IActivityUser as _IActivityUser} from '../activityUser/IActivityUser';

export interface IDelayFKActivity extends _IDelay, _IActivity, _IActivityUser {}
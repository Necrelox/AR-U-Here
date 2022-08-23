import {IDelay as _IDelay} from './IDelay';
import {IUser as _IUser} from '../../User';
import {IActivityUser as _IActivityUser} from '../activityUser/IActivityUser';

export interface IDelayFKUser extends _IDelay, _IUser, _IActivityUser {}
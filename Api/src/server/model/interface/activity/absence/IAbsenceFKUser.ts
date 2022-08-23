import {IAbsence as _IAbsence} from './IAbsence';
import {IUser as _IUser} from '../../User/IUser';
import {IActivityUser as _IActivityUser} from '../activityUser/IActivityUser';

export interface IAbsenceFKUser extends _IAbsence, _IUser, _IActivityUser {}
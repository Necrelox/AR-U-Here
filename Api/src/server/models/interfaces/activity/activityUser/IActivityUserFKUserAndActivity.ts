import {IActivityUser} from './IActivityUser';
import {IActivity} from '../IActivity';
import {IUser} from '../../user';

export interface IActivityUserFKUserAndActivity extends IActivityUser, IActivity, IUser {}

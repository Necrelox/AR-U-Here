import {IUser as _IUser} from '../IUser';
import {IFriend as _IFriend} from './IFriend';

export interface IFriendFKUser extends _IUser, _IFriend {}

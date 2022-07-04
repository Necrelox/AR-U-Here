import * as Models from '../../../model';
import * as DBQueries from '../../../database';
import * as Tools from '../../../tools';
import {ControllerUtils} from '../../utils/controllerUtils';

interface ReqBody {
    password: string;
    email: string;
    username: string;
    activityMessage: string;
}

export enum CodeError {
    CHECK_POST_CONTAIN_USER_REQUESTED = 'UserUtils::checkPostContainUserRequested',
    CHECK_IF_USER_IS_NOT_ALREADY_FRIEND = 'UserUtils::checkIfUserIsNotAlreadyFriend',
    CHECK_USER_SENDING_HAS_ALREADY_SEND_TO_THE_USER_REQUESTED = 'UserUtils::checkUserSendingHasAlreadySendToTheUserRequested',
    CHECK_IF_USER_REQUESTED_NAME_IS_NOT_SAME_TO_HIM_SELF = 'UserUtils::checkIfUserRequestedNameIsNotSameToHimSelf',
    CHECK_POST_CONTAIN_FRIEND = 'UserUtils::checkPostContainFriend',
}
export enum MessageError {
    CHECK_POST_CONTAIN_USER_REQUESTED = 'Post not contain userRequested.',
    CHECK_IF_USER_IS_NOT_ALREADY_FRIEND = 'User is already friend.',
    CHECK_USER_SENDING_HAS_ALREADY_SEND_TO_THE_USER_REQUESTED = 'User has already send a request to the userRequested.',
    CHECK_IF_USER_REQUESTED_NAME_IS_NOT_SAME_TO_HIM_SELF = 'User requested name is the same to him self.',
    CHECK_POST_CONTAIN_FRIEND = 'Post not contain friend.',
}


export abstract class UserUtils extends ControllerUtils {

    /** POST */
    protected async checkPostContainUserRequested(postBody: any) {
        if (!('userRequested' in postBody))
            throw {
                code: CodeError.CHECK_POST_CONTAIN_USER_REQUESTED,
                message: MessageError.CHECK_POST_CONTAIN_USER_REQUESTED
            };
    }

    protected async checkPostContainFriend(postBody: any) {
        if (!('friend' in postBody))
            throw {
                code: CodeError.CHECK_POST_CONTAIN_FRIEND,
                message: MessageError.CHECK_POST_CONTAIN_FRIEND
            };
    }


    protected async addFriend(userUuid: Buffer, friendUuid: Buffer) {
        await DBQueries.UserQueries.addFriend({
            user: userUuid,
            friend: friendUuid
        });
    }

    protected async checkIfUserIsNotAlreadyFriend(user: Buffer, friend: Buffer) {
        const friends : Models.User.IFriend[] = await DBQueries.UserQueries.getFriend({
            user,
            friend
        });
        if (friends.length !== 0)
            throw {
                code: CodeError.CHECK_IF_USER_IS_NOT_ALREADY_FRIEND,
                message: MessageError.CHECK_IF_USER_IS_NOT_ALREADY_FRIEND
            };
    }

    /** FRIEND REQUEST */
    protected async addFriendRequest(userUuid: Buffer, userRequestedUuid: Buffer) {
        await DBQueries.UserQueries.addFriendRequest({
            userSendingRequest: userUuid,
            userRequested: userRequestedUuid
        });
    }

    protected async deleteUserFriendRequestSendingAndReceived(userSendingRequest: Buffer, userRequested: Buffer) {
        await DBQueries.UserQueries.deleteFriendRequest({
            userSendingRequest,
            userRequested
        });
        await DBQueries.UserQueries.deleteFriendRequest({
            userSendingRequest: userRequested,
            userRequested: userSendingRequest
        });
    }

    protected async checkUserSendingHasAlreadySendToTheUserRequested(userSending: Buffer, userRequested: Buffer) {
        const friendRequest: Models.User.IFriendRequest[] = await DBQueries.UserQueries.getFriendRequest({
            userSendingRequest: userSending,
            userRequested
        });
        if (friendRequest.length !== 0)
            throw {
                code: CodeError.CHECK_USER_SENDING_HAS_ALREADY_SEND_TO_THE_USER_REQUESTED,
                message: MessageError.CHECK_USER_SENDING_HAS_ALREADY_SEND_TO_THE_USER_REQUESTED
            };
    }

    protected async checkIfUserRequestHasAlreadySendRequestToTheUserSendTheRequest(userSendingRequest: Buffer, userRequested: Buffer) : Promise<string> {
        const friendRequest: Models.User.IFriendRequest[] = await DBQueries.UserQueries.getFriendRequest({
            userSendingRequest: userRequested,
            userRequested: userSendingRequest
        });
        if (friendRequest.length !== 0) {
            await this.addFriend(userSendingRequest, userRequested);
            await this.addFriend(userRequested, userSendingRequest);
            await this.deleteUserFriendRequestSendingAndReceived(userSendingRequest, userRequested);
            return 'The user has already send a request to you, so you are now friends !';
        }
        return '';
    }

    /** USER */
    protected async checkIfUserRequestedNameIsNotSameToHimSelf(userRequestedName: string, userSendingName: string) {
        if (userSendingName === userRequestedName)
            throw {
                code: CodeError.CHECK_IF_USER_REQUESTED_NAME_IS_NOT_SAME_TO_HIM_SELF,
                message: MessageError.CHECK_IF_USER_REQUESTED_NAME_IS_NOT_SAME_TO_HIM_SELF
            };
    }

    protected async transformBodyToUserForUpdate(body: ReqBody) : Promise<Models.User.IUser> {
        const user: Models.User.IUser = {};
        if ('email' in body) {
            await Tools.Mailer.checkEmailHasBadSyntax(body.email!);
            await Tools.Mailer.checkEmailIsTemporary(body.email!);
            user.email = body.email;
        }
        if ('username' in body) {
            await this.checkSyntaxUsername(body.username!);
            await this.checkLengthUsername(body.username!);
            user.username = body.username;
        }
        if ('password' in body) {
            await this.checkLengthPassword(body.password);
            await this.checkSyntaxPassword(body.password);
            user.password = Tools.PasswordEncrypt.encrypt(body.password);
        }
        if ('activityMessage' in body) {
            user.activityMessage = body.activityMessage;
        }
        return user;
    }
}

export enum MessageError {
    CHECK_POST_CONTAIN_USER_REQUESTED = 'Post not contain userRequested.',
    CHECK_IF_USER_IS_NOT_ALREADY_FRIEND = 'User is already friend.',
    CHECK_USER_SENDING_HAS_ALREADY_SEND_TO_THE_USER_REQUESTED = 'User has already send a request to the userRequested.',
    CHECK_IF_USER_REQUESTED_NAME_IS_NOT_SAME_TO_HIM_SELF = 'User requested name is the same to him self.',
    CHECK_SYNTAX_USERNAME = 'Username syntax is not correct. (Allowed characters: a-z, A-Z, 0-9, _)',
    CHECK_LENGTH_USERNAME = 'Username length is not correct. (min 4, max 20)',
    CHECK_LENGTH_PASSWORD = 'Password length is not correct. (min 6, max 20)',
    CHECK_SYNTAX_PASSWORD = 'Password syntax is not correct. (Must contain at least one uppercase letter, one lowercase letter and one number)',
}

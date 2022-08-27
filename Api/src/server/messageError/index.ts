export enum MessageError {
    /** TOKEN */

    TOKEN_NOT_GIVEN = 'Token not given',
    TOKEN_EXPIRED = 'Token expired.',
    TOKEN_INVALID_SIGNATURE = 'Token invalid signature.',
    TOKEN_NOT_FOUND = 'Token not found.',
    TOKEN_FK_USER_NOT_FOUND = 'Token foreign key user not found.',
    TOKEN_EXPIRED_GENERATE = 'Token expired, new token generated.',

    /** EMAIL */
    EMAIL_BAD_SYNTAX = 'Email has bad syntax.',
    EMAIL_IS_TEMPORARY = 'Email is temporary mail.',

    /** USER */
    USER_IS_BLACKLISTED = 'User is blacklisted.',
    USER_HAS_NOT_PERMISSION = 'User has not permission.',
    USER_NOT_FOUND = 'User not found.',
    USER_NOT_VERIFIED = 'User not verified.',
    USER_ALREADY_VERIFIED = 'User already verified.',
    USER_INVALID_PASSWORD = 'Invalid password.',
    USER_CHECK_SYNTAX_USERNAME = 'Username contains invalid characters. Has to be alphanumeric.',
    USER_CHECK_LENGTH_USERNAME = 'Username length is too short or too long. (min: 4, max: 20)',
    USER_CHECK_LENGTH_PASSWORD = 'Password length is too short or too long. (min: 6, max: 20)',
    USER_CHECK_SYNTAX_PASSWORD = 'Password do contain one majuscule and one number minimum.',
    USER_PHONE_NUMBER_INVALID = 'Phone number invalid.',

    /** ACTIVITY */
    ACTIVITY_NOT_FOUND = 'Activity not found.',

    /** BODY */
    MISSING_PARAMETER = 'Missing parameter.',


}

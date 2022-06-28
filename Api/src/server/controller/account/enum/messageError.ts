export enum MessageError {
    MISSING_PARAMETER = 'Missing parameter.',
    USERNAME_BAD_SYNTAX = 'Username contains invalid characters. Has to be alphanumeric.',
    USERNAME_LENGTH_BAD = 'Username length is too short or too long. (min: 4, max: 20)',
    PASSWORD_LENGTH_BAD = 'Password length is too short or too long. (min: 6, max: 20)',
    PASSWORD_BAD_SYNTAX = 'Password do contain one majuscule and one number minimum.',
    USER_ALREADY_VERIFIED = 'User already verified.',
    USER_NOT_VERIFIED = 'User not verified.',
    USER_IS_BLACKLISTED = 'User is blacklisted.',
    INVALID_PASSWORD = 'Invalid password.',
    TOKEN_INVALID_SIGNATURE = 'Token invalid signature.',
    TOKEN_EXPIRED = 'Token expired, new token generated.',
}

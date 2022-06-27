export interface IUser {
    email?: string;
    username?: string;
    password?: Buffer;
    activityMessage?: string;
    isVerified?: boolean;
    role?: string;
    isConnected?: boolean;
    isBlackListed?: boolean;
    createdAt?: Date;
    uuid?: Buffer;
}

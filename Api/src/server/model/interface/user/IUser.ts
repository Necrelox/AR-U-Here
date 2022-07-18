export interface IUser {
    email?: string;
    username?: string;
    password?: Buffer;
    activityMessage?: string;
    address?: string;
    phone?: string;
    role?: string;
    isVerified?: boolean;
    isConnected?: boolean;
    isBlackListed?: boolean;
    createdAt?: Date;
    uuid?: Buffer;
}

export interface IUser {
    email: string;
    username: string;
    password: Buffer;
    activityMessage: string;
    isVerified: boolean;
    role: string;
    address: string;
    phone: string;
    isConnected: boolean;
    isBlackListed: boolean;
    createdAt: Date;
    uuid: Buffer;
}

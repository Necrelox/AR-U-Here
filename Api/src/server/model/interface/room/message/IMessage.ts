export interface IMessage {
    message?: string;
    createdAt?: Date;
    hasFile?: boolean;
    roomUserUuid?: Buffer;
    uuid?: Buffer;
}

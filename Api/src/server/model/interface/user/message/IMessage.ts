export interface IMessage {
    message: string;
    createdAt?: Date;
    userHistoryUuid: string;
    uuid?: Buffer;
}

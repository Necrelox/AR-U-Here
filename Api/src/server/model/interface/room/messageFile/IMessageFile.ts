export interface IMessageFile {
    path?: string;
    seed?: number;
    createdAt?: Date;
    sizeMod?: number;
    roomMessageUuid?: string;
    uuid?: Buffer;
}

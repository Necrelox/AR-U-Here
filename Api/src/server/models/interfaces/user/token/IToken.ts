export interface IToken {
    createdAt: Date;
    expireAt: Date;
    token: string;
    userUuid: Buffer;
    uuid: Buffer;
}

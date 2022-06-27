export interface IHistory {
    createdAt?: Date;
    isMessage?: boolean;
    isAction?: boolean;
    userUuid: string;
    uuid?: Buffer;
}

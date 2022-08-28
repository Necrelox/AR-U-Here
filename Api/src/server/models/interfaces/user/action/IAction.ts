export interface IAction {
    log: string;
    createdAt: Date;
    userHistoryUuid: string;
    uuid: Buffer;
}

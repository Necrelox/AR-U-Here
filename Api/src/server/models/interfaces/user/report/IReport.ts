export interface IReport {
    createdAt: Date;
    reason: string;
    userSendReport: Buffer;
    userReported: Buffer;
    uuid: Buffer;
}

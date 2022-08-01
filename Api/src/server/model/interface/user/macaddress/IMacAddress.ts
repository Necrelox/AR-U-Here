export interface IMacAddress {
    macAddress: string;
    createdAt: Date;
    active: boolean;
    userUuid: Buffer;
    uuid: Buffer;
}

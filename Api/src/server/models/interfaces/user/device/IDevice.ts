export interface IDevice {
    device: string;
    createdAt: Date;
    active: boolean;
    userUuid: Buffer;
    uuid: Buffer;
}

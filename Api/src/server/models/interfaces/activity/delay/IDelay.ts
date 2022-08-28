export interface IDelay {
    delayInMinutes: number;
    justification: string;
    acceptedJustification: boolean;
    activityUserUuid: Buffer;
    uuid: Buffer;
}
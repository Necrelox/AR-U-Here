export interface IDelay {
    delayInMinutes: number;
    justification: string;
    attendedActivity: boolean;
    acceptedJustification: boolean;
    activityUserUuid: Buffer;
    uuid: Buffer;
}
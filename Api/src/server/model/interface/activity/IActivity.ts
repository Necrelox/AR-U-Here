export interface IActivity {
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    studyLevel: number;
    uuid: Buffer;
}

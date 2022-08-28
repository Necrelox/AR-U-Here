export interface IActivity {
    activityKey: string;
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    studyLevel: string;
    uuid: Buffer;
}

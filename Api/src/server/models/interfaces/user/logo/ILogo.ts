export interface ILogo {
    path: string;
    createdAt: Date;
    seed: number;
    sizeMo: number;
    active: boolean;
    userUuid: string;
    uuid: Buffer;
}

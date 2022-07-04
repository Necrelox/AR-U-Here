export interface IUser {
    createdAt?: Date;
    isRoomMaster?: boolean;
    userUuid: string;
    roomUuid: string;
}

export interface IFriendRequest {
    createdAt?: Date;
    userSendingRequest?: Buffer;
    userRequested?: Buffer;
    uuid?: Buffer;
}

import {Request} from 'express';
import {BiometricQueries} from "../../../database";
import {User} from "../../../models";

export enum CodeError {
    BIOMETRIC_FILE_NOT_FOUND = "BiometricUtils::checkIfFilePropertyHasIdFile",
}

export enum MessageError {
    BIOMETRIC_FILE_NOT_FOUND = 'File not found',
}

export abstract class BiometricUtils {

    protected getFileIdPath(req: Request) : string {
        if (req.files && !('idFile' in req.files))
            throw {
                code: CodeError.BIOMETRIC_FILE_NOT_FOUND,
                message: MessageError.BIOMETRIC_FILE_NOT_FOUND
            };
        return req.files && req.files.idFile && (req.files.idFile as any).tempFilePath;
    }

    protected async getBiometric(userUuid: Buffer) : Promise<User.IFaceId> {
        const biometric: User.IFaceId[] = await BiometricQueries.getBiometric({
            userUuid
        });
        if (biometric.length === 0)
            throw {
                code: CodeError.BIOMETRIC_FILE_NOT_FOUND,
                message: MessageError.BIOMETRIC_FILE_NOT_FOUND
            };
        return biometric[0] as User.IFaceId;
    }

}

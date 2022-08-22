import {Request} from 'express';

export enum CodeError {
    BIOMETRIC_FILE_NOT_FOUND = "BiometricUtils::checkIfFilePropertyHasIdFile"
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

}

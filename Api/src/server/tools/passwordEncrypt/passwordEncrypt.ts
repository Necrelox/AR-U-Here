import {randomBytes, pbkdf2Sync} from 'crypto';

export class PasswordEncrypt {
    public static encrypt(password: string): Buffer {
        const salt: Buffer = randomBytes(16);
        const hash: Buffer = pbkdf2Sync(password, salt, 1000, 64, 'sha512');
        return Buffer.concat([salt, hash]);
    }

    public static compare(password: string, hashedPassword: Buffer): boolean {
        const salt: Buffer = hashedPassword.slice(0, 16);
        const hash: Buffer = hashedPassword.slice(16);
        const hash2: Buffer = Buffer.alloc(hashedPassword.length - 16);
        const tempBuf: Buffer = pbkdf2Sync(password, salt, 1000, 64, 'sha512');
        hash2.set(tempBuf);
        hash2.fill(0, tempBuf.length);
        return hash.compare(hash2) === 0;

    }
}

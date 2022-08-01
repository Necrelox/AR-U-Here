import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import {Transporter} from 'nodemailer';

export enum CodeError {
    CHECK_EMAIL_HAS_BAD_SYNTAX = 'Mailer::checkEmailHasBadSyntax',
    CHECK_EMAIL_IS_TEMPORARY = 'Mailer::checkEmailIsTemporary',
}

export enum MessageError {
    EMAIL_BAD_SYNTAX = 'Email has bad syntax.',
    EMAIL_IS_TEMPORARY = 'Email is temporary mail.',
}

export class Mailer {

    public static async checkEmailHasBadSyntax(email: string) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email))
            throw {
                code: CodeError.CHECK_EMAIL_HAS_BAD_SYNTAX,
                message: MessageError.EMAIL_BAD_SYNTAX
            };
    }

    public static async checkEmailIsTemporary(email: string) {
        const emailTempo: string[] = require('./emailTempo.json');
        if ((emailTempo).includes(email.split('@')[1] as string))
            throw {
                code: CodeError.CHECK_EMAIL_IS_TEMPORARY,
                message: MessageError.EMAIL_IS_TEMPORARY
            };
    }

    public static sendMail(mailOptions: nodemailer.SendMailOptions): Promise<SMTPTransport.SentMessageInfo> {
        const transporter: Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_AUTH_USER,
                pass: process.env.EMAIL_AUTH_PASSWORD
            }
        });
        return transporter.sendMail(mailOptions);
    }
}



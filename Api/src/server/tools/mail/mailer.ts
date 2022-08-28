import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import {Transporter} from 'nodemailer';
import emailTempo from './emailTempo.json';

import {MessageError} from '../../messageError';

export class Mailer {

    public static async checkEmailHasBadSyntax(email: string) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email))
            throw {
                code: 'Mailer::checkEmailHasBadSyntax',
                message: MessageError.EMAIL_BAD_SYNTAX
            };
    }

    public static async checkEmailIsTemporary(email: string) {
        if ((emailTempo).includes(email.split('@')[1] as string))
            throw {
                code: 'Mailer::checkEmailIsTemporary',
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



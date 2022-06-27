import * as emailTempo from "./emailTempo.json";
import * as nodemailer from 'nodemailer';
import {MessageError} from "./enum/messageError";
import {CodeError} from "./enum/codeError";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import {Transporter} from "nodemailer";

export class Mailer {

    public static checkEmailHasBadSyntax(email: string) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email))
            throw {
            code: CodeError.CHECK_EMAIL_HAS_BAD_SYNTAX,
            message: MessageError.EMAIL_BAD_SYNTAX
        };
    }

    public static checkEmailIsTemporary(email: string) {
        if ((emailTempo['default']).includes(email.split("@")[1]))
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



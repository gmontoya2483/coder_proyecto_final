import {createTransport} from 'nodemailer';
import {config} from './config';
import {logger} from './logger';

export interface EmailContent {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

export class Mailer {
    private transporter = createTransport({
        service: 'gmail',
        auth: {
            user: config.email.emailAccount,
            pass: config.email.emailAccountPassword,
        },
    });

    private emailContent: EmailContent | undefined;

    public setEmailContent (emailContent:EmailContent) {
        this.emailContent = emailContent;
    }

    public async sendEmail() {
        if(!this.emailContent)
            return {success: false, error: `No se definió el contenido del email`};

        try {
            const info = await this.transporter.sendMail(this.emailContent);
            return {success: true, info}
        } catch (err: any) {
            logger.error(err);
            return {success: false, error: err.message};
        }
    }

}

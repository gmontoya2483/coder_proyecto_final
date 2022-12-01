import {config} from './config';
import twilio from 'twilio';
import {logger} from './logger';

export interface WhatsappMessage {
    from: string;
    to: string;
    body: string;
}

export class Whatsapp {
    private accountSid = config.twilio.accountSid;
    private authToken = config.twilio.authToken;
    private client = twilio(this.accountSid, this.authToken)
    private message: WhatsappMessage | undefined;

    public setWhatsappMessage(whatsappMessage: WhatsappMessage){
        this.message = whatsappMessage;
    }

    public async sendMessage() {
        if(!this.message)
            return {success: false, error: `No se definió el contenido del Mensaje`};
        try {
            const message = await this.client.messages.create(this.message);
            return {success: true, message}
        } catch (err:any) {
            logger.error(err);
            return {success: false, error: err.message}
        }
    }
}

import bcrypt from 'bcrypt';
import {logger} from './logger';

export const generateHashPassword = async (text: string, rounds: number = 10) => {
    try {
        const salt = await bcrypt.genSalt(rounds);
        return await bcrypt.hash(text, salt);
    } catch (err: any) {
        logger.error(err);
        throw (err.message)
    }

}

export const validateHash = async (text: string, hashedText: string) => {
    try {
        return await bcrypt.compare(text, hashedText);
    } catch (err: any) {
        logger.error(err);
        throw (err.message)
    }

}

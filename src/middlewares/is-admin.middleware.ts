import {NextFunction, Request, Response} from 'express';
import {IS_ADMIN} from '../server';
import {logger} from '../utils/logger';

export const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!IS_ADMIN) {
        logger.debug(`User is not admin, IS_ADMIN: ${IS_ADMIN}`);
        return res.status(403).json({
            'error': -1,
            'descripcion': `ruta '${ req.originalUrl }' método '${ req.method }' no autorizada`
        });
    }

    logger.debug(`User is  admin, IS_ADMIN: ${IS_ADMIN}`);
    next();
}

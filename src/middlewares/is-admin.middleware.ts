import {NextFunction, Request, Response} from 'express';
import {IS_ADMIN} from '../server';

export const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!IS_ADMIN)
        return res.status(403).json({
            'error': -1,
            'descripcion': `ruta '${ req.originalUrl }' método '${ req.method }' no autorizada`
        });

    next();
}

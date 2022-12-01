import express from "express";
import {logger} from '../utils/logger';

export const routerLogout = express.Router();

routerLogout.get('/', async (req, res) => {
    logger.debug(`Logout => ${await req.user}`);
    req.session.destroy( err =>{
        res.redirect('/login')
    })
});

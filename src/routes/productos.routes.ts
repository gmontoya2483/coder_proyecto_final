import express from 'express';
import {logger} from '../utils/logger';
import {ProductosDao} from '../daos';
export const routerProductos = express.Router();


routerProductos.get('/', async (req, res) => {

    logger.debug(`productos routes -> ${await req.user}`)
    const user:any = await req.user;
    const username = user.fullName;

    const contenedor = new ProductosDao();
    const products = await contenedor.getAll();
    logger.debug(`productos routes -> ${products}`)


    return res.render('products', { products, username })

})

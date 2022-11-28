/* ------------------- Modules ------------------- */
import express, {Application, NextFunction} from 'express';
import {routerProducts} from './routes/productos.routes';
import {routerCarrito} from './routes/carritos.routes';
import {config} from './utils/config';
import cluster from 'cluster'
import os from 'os';
import {logger} from './utils/logger';


const app: Application = express();

/* ------------- VARIABLE IS_ADMIN ------------------ */
export const IS_ADMIN: boolean = true;

/* ------------------- Middleware ------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

/* ------------------- Routes ------------------- */
app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCarrito);

app.use((req, res)=> {
    res.status(400).send({
        'error': -2,
        'description': `Ruta ${req.originalUrl} método ${req.method} no implementada.`
    });

});


/* ------------------- Middleware Errores ------------------- */
app.use(function(err, req, res, next) {
    logger.error(err.stack);
    res.status(500).send('Something is broken!');
});


/* ------------------- Server ------------------- */



if (cluster.isPrimary && config.server.mode === 'CLUSTER') {
    const CPU_CORES = os.cpus().length;
    for (let i = 0; i < CPU_CORES; i++) {
        cluster.fork();
    }

    cluster.on('exit', worker => {
        logger.info(`Worker ${process.pid} ${worker.id}  finalizo ${new Date().toLocaleString()}`);
        cluster.fork();
    });

} else {

    const server = app.listen(config.server.port, ()=> {
        logger.info(`Server on ->  ${JSON.stringify(server.address())}, process ${process.pid}`);
        logger.debug(`Contenedor on ->  ${config.server.container}`);
    });
    server.on('error', error => {
        logger.error(`Error en el servidor ${error}`);
    });

}



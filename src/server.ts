/* ------------------- Modules ------------------- */
import express, {Application, NextFunction} from 'express';
import {engine} from 'express-handlebars';
import {routerApiProducts} from './routes/api.productos.routes';
import {routerApiCarrito} from './routes/api.carritos.routes';
import {config} from './utils/config';
import cluster from 'cluster'
import os from 'os';
import {logger} from './utils/logger';
import path from 'path';
import {routerRegister} from './routes/register.routes';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import {generateMongoDbURL} from './utils/generateMongoDbURL';
import passport from "passport";
import {routerLogin} from './routes/login.routes';
import {routerLogout} from './routes/logout.routes';
import {routerProductos} from './routes/productos.routes';
import {Authorization} from './middlewares/auth.middleware';
import {routerCarrito} from './routes/carritos.routes';




const app: Application = express();

/* ------------- VARIABLE IS_ADMIN ------------------ */
export const IS_ADMIN: boolean = true;






/* ------------------- Middleware ------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname,'./public')));

logger.info(`public -> ${path.join(__dirname,'./public')}`)

/* ----------- MONGO STORE ------------------------*/

const MongoStore = connectMongo.create({
    mongoUrl: generateMongoDbURL(),
    ttl: 600
});

// Session Setup
app.use(session({
    store: MongoStore,
    secret: config.mongoDB.secret_key,
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());


//Motor de plantillas
app.set('views', path.join(__dirname,'./views'));
app.set('view engine', 'hbs');
app.engine('hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs'
}));



/* ------------------- Routes ------------------- */
app.use('/api/productos', routerApiProducts);
app.use('/api/carrito', routerApiCarrito);
app.use('/register', routerRegister);
app.use('/login', routerLogin);
app.use('/logout', routerLogout);
app.use('/', [Authorization],routerProductos);
app.use('/carrito', [Authorization],routerCarrito);

app.use((req, res)=> {
    logger.error(`Ruta ${req.originalUrl} método ${req.method} no implementada.`);
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



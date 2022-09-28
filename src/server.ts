/* ------------------- Modules ------------------- */
import express, {Application, NextFunction} from 'express';
import {routerProducts} from './routes/productos.routes';
import {routerCarrito} from './routes/carritos.routes';


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
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});


/* ------------------- Server ------------------- */
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=> {
    console.log(`Server on ->  ${JSON.stringify(server.address())}`);
    console.log(`Contenedor on ->  ${process.env.CONTENEDOR}`);
});
server.on('error', error => {
    console.error(`Error en el servidor ${error}`);
});

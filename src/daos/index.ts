import {config} from '../utils/config';
import {logger} from '../utils/logger';

let ProductosDao
let CarritosDao
let UsuariosDao

(async ()=> {
    switch (config.server.container) {
        case 'archivo':
            const { default: ProductosDaoArchivo }  = await import('./productos/ProductosDaoArchivo');
            const {default: CarritosDaoArchivo}  = await import('./carritos/CarritosDaoArchivo');
            ProductosDao = ProductosDaoArchivo;
            CarritosDao = CarritosDaoArchivo;
            logger.debug(`Selected => Daos Archivo`);
            break;
        case 'mongo-db':
            const { default: ProductosDaoMongo }  = await import('./productos/ProductosDaoMongo');
            const {default: CarritosDaoMongo}  = await import('./carritos/CarritosDaoMongo');
            const {default: UsuariosDaoMongo} = await import('./usuarios/UsuariosDaoMongo')
            ProductosDao = ProductosDaoMongo;
            CarritosDao = CarritosDaoMongo;
            UsuariosDao = UsuariosDaoMongo;
            logger.debug(`Selected => Daos MongoDB`);
            break;
        case 'firebase':
            const { default: ProductosDaoFirebase }  = await import('./productos/ProductosDaoFireBase');
            const {default: CarritosDaoFirebase}  = await import('./carritos/CarritosDaoFireBase');
            ProductosDao = ProductosDaoFirebase;
            CarritosDao = CarritosDaoFirebase;
            logger.debug(`Selected => Daos Firebase`);
            break;
    }
})();

export {ProductosDao, CarritosDao, UsuariosDao}


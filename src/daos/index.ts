import {config} from '../utils/config';

let ProductosDao
let CarritosDao

(async ()=> {
    switch (config.server.container) {
        case 'archivo':
            const { default: ProductosDaoArchivo }  = await import('./productos/ProductosDaoArchivo');
            const {default: CarritosDaoArchivo}  = await import('./carritos/CarritosDaoArchivo');
            ProductosDao = ProductosDaoArchivo
            CarritosDao = CarritosDaoArchivo
            break;
        case 'mongo-db':
            const { default: ProductosDaoMongo }  = await import('./productos/ProductosDaoMongo');
            const {default: CarritosDaoMongo}  = await import('./carritos/CarritosDaoMongo');
            ProductosDao = ProductosDaoMongo
            CarritosDao = CarritosDaoMongo
            break;
        case 'firebase':
            const { default: ProductosDaoFirebase }  = await import('./productos/ProductosDaoFireBase');
            const {default: CarritosDaoFirebase}  = await import('./carritos/CarritosDaoFireBase');
            ProductosDao = ProductosDaoFirebase
            CarritosDao = CarritosDaoFirebase
            break;
    }
})();

export {ProductosDao, CarritosDao}


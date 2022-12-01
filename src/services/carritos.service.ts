import {CarritosDao} from '../daos';
import {logger} from '../utils/logger';

export class CarritosService {


    constructor(
        private contenedor = new CarritosDao()
    ) {}

    async nuevoCarrito(email) {
        try {
            let carrito = await this.contenedor.getByEmail(email);
            if(carrito)
                return {success: false, error: `El usuario ya tiene un carrito abierto -> ${carrito._id}`};

            carrito = await this.contenedor.create({ email, 'timestamp': Date.now(), 'productos': [] });
            return {success: true, carrito};

        } catch (err:any) {
            logger.error(err);
            return {success: false, error: err.message};

        }
    }

    async searchCarritoByEmail(email) {
        try {
            const carrito = await this.contenedor.getByEmail(email);
            return {success: true, carrito}
        } catch (err: any) {
            logger.error(err);
            return {success: false, error: err.message}
        }
    }


    async submitCarritoByEmail(email) {
        try {
            const carritoFoundResult = await this.searchCarritoByEmail(email);
            if(carritoFoundResult.success && carritoFoundResult.carrito) {

                logger.debug(`TODO: Enviar email con datos del carrito`); //TODO: Enviar email con datos del carrito

                const deletedCarrito = await this.contenedor.deleteById(carritoFoundResult.carrito._id);
                return {success: true, deletedCarrito}
            } else {
                return {success: false, error: `No se encontró un carrito para el usuario ${email}`}
            }
        }
         catch (err: any) {
            logger.error(err);
            return {success: false, error: err.message}
        }

    }


}

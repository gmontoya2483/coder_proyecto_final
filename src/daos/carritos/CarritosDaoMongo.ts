import {ContenedorMongo} from '../../contenedores/contenedorMongo';
import {Carrito, ICarrito} from '../../models/carritos.model';

export default class CarritosDaoMongo extends ContenedorMongo<ICarrito>{
    constructor() {
        super(Carrito);
    }

    async getByEmail(email: string) {
        return await Carrito.findOne({email});
    }
}

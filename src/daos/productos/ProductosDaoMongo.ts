import {ContenedorMongo} from '../../contenedores/contenedorMongo';
import {IProducto, Producto} from '../../models/productos.model';

export default class ProductosDaoMongo extends ContenedorMongo<IProducto> {
    constructor() {
        super(Producto);
    }
}

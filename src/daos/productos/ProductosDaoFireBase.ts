import {ContenedorFireBase} from '../../contenedores/contenedorFireBase';

export default class ProductosDaoFireBase extends ContenedorFireBase {
    constructor() {
        super('productos');
    }
}

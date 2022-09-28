import {ContenedorArchivo} from '../../contenedores/contenedorArchivo';

export default class ProductosDaoArchivo extends ContenedorArchivo {


    constructor() {
        super('./db_files/productos.txt');
    }

}

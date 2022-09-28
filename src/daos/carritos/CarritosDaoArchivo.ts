import {ContenedorArchivo} from '../../contenedores/contenedorArchivo';
import {config} from '../../utils/config';

export default class CarritosDaoArchivo extends ContenedorArchivo {


    constructor() {
        super(config.ArchivoDB.carritos);
    }

}

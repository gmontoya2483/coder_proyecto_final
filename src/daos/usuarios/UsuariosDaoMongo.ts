import {ContenedorMongo} from '../../contenedores/contenedorMongo';
import {IUsuario, Usuario } from '../../models/users.model';


export default class UsuariosDaoMongo extends ContenedorMongo<IUsuario>{
    constructor() {
        super(Usuario);
    }

    async getByEmail(email) {
        return Usuario.findOne({email});
    }


}


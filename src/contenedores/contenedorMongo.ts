import {ContenedorInterface} from '../interfaces/contenedor.interface';
import mongoose, { Model } from 'mongoose';
import {config} from '../utils/config';


const strConn = `mongodb://${config.mongoDB.host}:${config.mongoDB.port}/${config.mongoDB.dbName}`
mongoose.connect(strConn, config.mongoDB.options)
    .then(()=>{
        console.log('Base de datos conectada!');
    })
    .catch((err) => {
        console.error('No se pudo conectar a la base de datos', err)
    })

export class ContenedorMongo<T> implements ContenedorInterface {
    constructor(private entityModel: Model<T>) {}

    async create(data): Promise<any> {
        try {
            return  await this.entityModel.create(data);
        } catch (err) {
            console.error(`${this.entityModel.modelName}, ${ err }`);
            throw new Error(`No se pudo crear la entidad - ${this.entityModel.modelName}`);
        }
    }


    async deleteById(id): Promise<any> {
        try {
            return await this.entityModel.findByIdAndDelete(id);
        } catch (err) {
            console.error(`${this.entityModel.modelName}, ${ err }`);
            throw new Error(`No se pudo eliminar entidad - ${this.entityModel.modelName}`);
        }
    }

    async getAll(): Promise<any[]> {
        try {
            return  await this.entityModel.find();
        } catch (err) {
            console.error(`${this.entityModel.modelName}, ${ err }`);
            throw new Error(`No se pudo buscar entidades - ${this.entityModel.modelName}`);
        }

    }

    async getById(id): Promise<any> {
        try {
            return  await this.entityModel.findById(id);
        } catch (err) {
            console.error(`${this.entityModel.modelName}, ${ err }`);
            throw new Error(`No se pudo buscar entidad - ${this.entityModel.modelName}`);
        }
    }

    async update(data): Promise<any> {
        const {id, ...obj}  = data;
        try {
            return await this.entityModel.findByIdAndUpdate(id, obj, {new: true});
        } catch (err) {
            console.error(`${this.entityModel.modelName}, ${ err }`);
            throw new Error(`No se pudo modificar entidad - ${this.entityModel.modelName}`);
        }
    }

}

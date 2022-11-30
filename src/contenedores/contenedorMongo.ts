import {ContenedorInterface} from '../interfaces/contenedor.interface';
import mongoose, { Model } from 'mongoose';
import {config} from '../utils/config';
import {logger} from '../utils/logger';
import {generateMongoDbURL} from '../utils/generateMongoDbURL';


const strConn = generateMongoDbURL();
mongoose.connect(strConn, config.mongoDB.options)
    .then(()=>{
        logger.info('Base de datos conectada!');
    })
    .catch((err) => {
        logger.error('No se pudo conectar a la base de datos', err)
    })

export class ContenedorMongo<T> implements ContenedorInterface {
    constructor(private entityModel: Model<T>) {}

    async create(data): Promise<any> {
        try {
            return  await this.entityModel.create(data);
        } catch (err) {
            logger.error(`${this.entityModel.modelName}, ${ err }`);
            throw new Error(`No se pudo crear la entidad - ${this.entityModel.modelName}`);
        }
    }


    async deleteById(id): Promise<any> {
        try {
            return await this.entityModel.findByIdAndDelete(id);
        } catch (err) {
            logger.error(`${this.entityModel.modelName}, ${ err }`);
            throw new Error(`No se pudo eliminar entidad - ${this.entityModel.modelName}`);
        }
    }

    async getAll(): Promise<any[]> {
        try {
            return  await this.entityModel.find();
        } catch (err) {
            logger.error(`${this.entityModel.modelName}, ${ err }`);
            throw new Error(`No se pudo buscar entidades - ${this.entityModel.modelName}`);
        }

    }

    async getById(id): Promise<any> {
        try {
            return  await this.entityModel.findById(id);
        } catch (err) {
            logger.error(`${this.entityModel.modelName}, ${ err }`);
            throw new Error(`No se pudo buscar entidad - ${this.entityModel.modelName}`);
        }
    }

    async update(data): Promise<any> {
        const {id, ...obj}  = data;
        try {
            return await this.entityModel.findByIdAndUpdate(id, obj, {new: true});
        } catch (err) {
            logger.error(`${this.entityModel.modelName}, ${ err }`);
            throw new Error(`No se pudo modificar entidad - ${this.entityModel.modelName}`);
        }
    }

}

import {config} from './config';

export const generateMongoDbURL = () => {
    return `${config.mongoDB.protocol}://${config.mongoDB.url}/${config.mongoDB.dbName}`;
}

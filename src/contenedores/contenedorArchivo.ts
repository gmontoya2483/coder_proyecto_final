import fs from 'fs';
import {ContenedorInterface} from '../interfaces/contenedor.interface';
import {v4 as uuid} from 'uuid'

export class ContenedorArchivo implements ContenedorInterface {

    private fileName: string;

    constructor(fileName) {
        this.fileName = fileName;
    }

    async save(objs) {
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(objs,null,2), 'utf-8');
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async create (data) {
        const objs = await this.getAll();
        let newId = uuid();
        const newData = {...data, id: newId};
        objs.push(newData);
        await this.save(objs);
        return newData;
    }

    async update(data) {
        const objs = await this.getAll();
        const itemIndex = objs.findIndex(obj => obj.id === data.id);
        if (itemIndex === -1) {
            return itemIndex
        }
        objs[itemIndex] = {...data};
        await this.save(objs);
        return objs[itemIndex];
    }

    async getById(id) {
        const objs = await this.getAll();
        return objs.find(obj => obj.id == id);
    }

    async getAll() {
        try {
            const objs = await fs.promises.readFile(this.fileName, 'utf-8');
            return JSON.parse(objs);
        } catch (error) {
            return [];
        }
    }


    async deleteById(id) {

        const objs = await this.getAll();
        const newObjs = objs.filter(obj => obj.id != id);
        if(objs.length === newObjs.length) {
            return -1;
        }
        await this.save(newObjs);
        return id;
    }


}








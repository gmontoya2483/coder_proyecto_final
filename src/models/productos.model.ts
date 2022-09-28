import {Schema, model} from 'mongoose';

export interface IProducto {
    nombre: string;
    descripcion: string,
    codigo: string,
    foto: string,
    precio: number,
    stock: number,
    timestamp: Date,
}

const productoSchema = new Schema<IProducto>({
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    codigo: {type: String, required: true},
    foto: {type: String, required: true},
    precio: {type: Number, required: true},
    stock: {type: Number, required: true},
    timestamp: {type: Date, default: Date.now()}
});

export const Producto = model('Producto', productoSchema );

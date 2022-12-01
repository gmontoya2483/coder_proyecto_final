import {Schema, model} from 'mongoose';

export interface ICarrito {
    email: string,
    productos: [
        {
            nombre: string;
            descripcion: string;
            codigo: string;
            foto: string;
            precio: number;
            stock: number;
            timestamp: Date;
        }
    ];
    timestamp: Date;
}

const CarritoSchema = new Schema<ICarrito>({
    email: {type: String, required: true},
    timestamp: {type: Date, default: Date.now()},
    productos: [{
        nombre: {type: String, required: true},
        descripcion: {type: String, required: true},
        codigo: {type: String, required: true},
        foto: {type: String, required: true},
        precio: {type: Number, required: true},
        stock: {type: Number, required: true},
        timestamp: {type: Date, required: true}
    }],
});

export const Carrito = model('Carrito', CarritoSchema );

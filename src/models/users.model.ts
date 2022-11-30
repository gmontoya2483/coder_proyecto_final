import {Schema, model} from 'mongoose';

export interface IUsuario {
    email: string;
    password: string;
    fullName: string;
    age: number;
    phoneNumber: string;
    imageUrl: string;
}


const UsuarioSchema = new Schema<IUsuario>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});
export const Usuario = model('Usuario', UsuarioSchema);

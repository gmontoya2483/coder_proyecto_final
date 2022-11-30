import { Router } from 'express';
import { UsuariosDao} from '../daos';
import {generateHashPassword} from '../utils/security';
export const routerRegister: Router = Router();



routerRegister.get('/', [], async (req, res) => {
    return res.render('register')
});

routerRegister.get('/error', (req, res) => {
    return res.render('register-error');
});

routerRegister.post('/', async (req, res) => {
    const contenedor = new UsuariosDao();
    const {email, fullName, password, age, phoneNumber, avatar} = req.body;
    const user = await contenedor.getByEmail(email);
    if(user)
        return res.redirect('/register/error');

    const hashedPassword = await generateHashPassword(password);
    await contenedor.create({
        email,
        fullName,
        age,
        phoneNumber,
        password: hashedPassword,
        imageUrl: avatar
    })

    return res.redirect('/api/productos');
});

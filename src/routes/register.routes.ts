import { Router } from 'express';
import { UsuariosDao} from '../daos';
import {generateHashPassword} from '../utils/security';
import {upload} from '../utils/upload';

import {logger} from '../utils/logger';
import {Mailer} from '../utils/mailer';
import {config} from '../utils/config';
export const routerRegister: Router = Router();


routerRegister.get('/', [], async (req, res) => {
    return res.render('register')
});

routerRegister.get('/error', (req, res) => {
    return res.render('register-error');
});

routerRegister.post('/', upload.single('avatar'),async (req, res) => {

    if(!req.file) {
        logger.error(`Falta imagen`);
        return res.redirect('/register/error');
    }

    const contenedor = new UsuariosDao();
    const {email, fullName, password, age, phoneNumber} = req.body;
    let user = await contenedor.getByEmail(email);
    if(user)
        return res.redirect('/register/error');

    const hashedPassword = await generateHashPassword(password);
    user = await contenedor.create({
        email,
        fullName,
        age,
        phoneNumber,
        password: hashedPassword,
        imageUrl: req.file.filename
    });

    if(!user)
        return res.redirect('/register/error');

    const mailer = new Mailer();
    mailer.setEmailContent({
        from: 'Ecommerce app <noreply@example.com>',
        to: `"Administrador !!" ${config.email.administratorEmail}`,
        subject: `Nuevo usuario registrado: ${user.fullName}`,
        text: `El usuario ${user.fullName} se registró en la aplicación con el email ${user.email}.`,
        html: `
            <html>
                <body>
                    <p>El usuario ${user.fullName} se registró en la aplicación con el email ${user.email}.</p>
                </body>
            </html>
        `,
    });

    const sendEmailResponse = await mailer.sendEmail();
    logger.debug(sendEmailResponse);

    return res.redirect('/productos');
});

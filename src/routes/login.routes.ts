import express from "express";
export const routerLogin = express.Router();


import passport from "passport";
import { Strategy } from "passport-local";

import { UsuariosDao} from '../daos';

import {validateHash} from '../utils/security';
import {logger} from '../utils/logger';



const LocalStrategy = Strategy;

passport.use(new LocalStrategy(
    async function(username, password, done) {
        logger.debug(`${ username } ${ password }`);
        //Logica para validar si un usuario existe

        const contenedor = new UsuariosDao();

        const existeUsuario = await contenedor.getByEmail(username);
        if (!existeUsuario)
            return done(null, false);

        const match = await validateHash(password, existeUsuario.password);
        if (!match)
            return done(null, false);

        return done(null, existeUsuario);
    }
));

passport.serializeUser((usuario: any, done)=>{
    done(null, usuario.email);
});

passport.deserializeUser((email, done)=>{
    const contenedor = new UsuariosDao();
    const existeUsuario = contenedor.getByEmail(email);
    done(null, existeUsuario);
});


routerLogin.get('/', (req, res) => {
    return res.render('login')
});

routerLogin.get('/error', (req, res) => {
    return res.render('login-error')
});

routerLogin.post('/', passport.authenticate('local',  {successRedirect: '/api/productos', failureRedirect: '/login/error'} ));

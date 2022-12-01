import { Router } from 'express';
import {logger} from '../utils/logger';
import {CarritosService} from '../services/carritos.service';
import {Whatsapp} from '../utils/whatsapp';
import {config} from '../utils/config';
import {Mailer} from '../utils/mailer';


export const routerCarrito: Router = Router();


routerCarrito.get('/', [],async (req, res) => {

    const carritosService = new CarritosService();

    const user:any = await req.user;
    const username = user.fullName;
    const email = user.email;

    let carritoResult = await carritosService.searchCarritoByEmail(email);

    if(carritoResult.success && !carritoResult.carrito)
        carritoResult = await carritosService.nuevoCarrito(email);

    if(!carritoResult.success)
        return res.redirect('/');


    const carrito = carritoResult.carrito.toJSON()


    return res.render('carrito', {
        carrito,
        products: carrito.productos,
        username
    });

});

routerCarrito.get('/submit', [],async (req, res) => {
    const carritosService = new CarritosService();

    const user:any = await req.user;
    const username = user.fullName;
    const email = user.email;

    const submitCarritoResult = await carritosService.submitCarritoByEmail(email)
    if (!submitCarritoResult.success)
        return res.render('/carrito-error', {username});

    logger.debug({submitCarritoResult});

    // Enviar Whatsapp
    const whatsapp = new Whatsapp();
    whatsapp.setWhatsappMessage({
        from: 'whatsapp:+14155238886',
        body: `El usuario ${username} ha realizado un pedido`,
        to: `whatsapp:${config.twilio.administratorPhone}`
    });
    const whatsappMessageResponse = await whatsapp.sendMessage();
    logger.debug(whatsappMessageResponse);

    // Enviar email
    const mailer = new Mailer();



    mailer.setEmailContent({
        from: 'Ecommerce app <noreply@example.com>',
        to: `"Administrador !!" ${config.email.administratorEmail}`,
        subject: `Nuevo pedido de: ${user.fullName}`,
        text: `El usuario ${user.fullName} realizo un pedido.`,
        html: `
            <html>
                <body>
                    <p>El usuario ${user.fullName} ha realizado un pedido.</p>
                    <ol>
                        ${itemList(submitCarritoResult.deletedCarrito.productos)}
                    </ol>
                </body>
            </html>
        `,
    });

    const sendEmailResponse = await mailer.sendEmail();
    logger.debug(sendEmailResponse);

    return res.render('carrito-confirmation', {username});


});


const itemList = (productos)=> {
    const htmlList = productos.map(producto => `<li>${producto.nombre}</li>`)
    return htmlList.join('');
}


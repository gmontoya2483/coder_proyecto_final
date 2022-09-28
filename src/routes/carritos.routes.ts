import { Router } from 'express';
import { notFoundMessage as productNotFoundMessage } from './productos.routes'
import {CarritosDao} from '../daos';
import {ProductosDao} from '../daos';

export const routerCarrito: Router = Router();

routerCarrito.post('/', [], async (req, res) => {
    const contenedor = new CarritosDao();
    const carrito = await contenedor.create({ 'timestamp': Date.now(), 'productos': [] });
    return res.status(201).json(carrito);
});

routerCarrito.delete('/:id',[], async (req, res) => {
    const contenedor = new CarritosDao();
    const id = req.params.id;
    const deletedId = await contenedor.deleteById(id);
    return (deletedId === -1 || deletedId === null)
        ? res.status(404).json(notFoundMessage(id))
        : res.json({'mensaje': `Carrito con id: '${ id }' fue eliminado`});
});

routerCarrito.get('/:id/productos', [],async (req, res) => {
    const contenedor = new CarritosDao();
    const id = req.params.id;
    const carrito = await contenedor.getById(id);
    if (!carrito) return res.status(404).json(notFoundMessage(id));
    return res.json(carrito.productos);
});


routerCarrito.post('/:id/productos', [], async (req, res) => {
    const contenedorCarrito = new CarritosDao();
    const contenedorProductos = new ProductosDao();

    const id_carrito = req.params.id;
    const { id_producto } = req.body;

     const carrito = await contenedorCarrito.getById(id_carrito);
      if (!carrito) return res.status(404).json(notFoundMessage(id_carrito));

      if(carrito.productos.find(producto => producto.id === id_producto))
          return res.status(400).json({'mensaje': `El carrito ya tiene el producto con el id: '${id_producto}'`});

     const producto = await contenedorProductos.getById(id_producto);
     if (!producto)
         return res.status(404).json(productNotFoundMessage(id_producto));

     carrito.productos?.push(producto);

     await contenedorCarrito.update(carrito);
     return res.status(201).json(carrito);
});

routerCarrito.delete('/:id/productos/:id_prod', [], async (req, res) => {
    const contenedor = new CarritosDao();
    const id_carrito = req.params.id;
    const id_prod = req.params.id_prod;

    const carrito = await contenedor.getById(id_carrito);
    if (!carrito)
        return res.status(404).json(notFoundMessage(id_carrito));

    const filteredProductos = carrito.productos?.filter(producto => producto.id.toString() !== id_prod)
    if(carrito.productos.length === filteredProductos.length)
        return res.status(400).json({'mensaje': `El carrito no tiene el producto con id: '${ id_prod }'`});

    carrito.productos = filteredProductos;
    await contenedor.update(carrito)
    return res.json({'mensaje': `Se eliminó del carrito el producto con el id '${id_prod}'.`});
});


const notFoundMessage = (id) => {
    return {'mensaje': `No se encontró el carrito con el id: '${id}'.`}
}

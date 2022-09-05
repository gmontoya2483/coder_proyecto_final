import { Router } from 'express';
import { isAdminMiddleware } from '../middlewares/is-admin.middleware';
import { Contenedor } from '../utils/contenedor'
export const routerProducts: Router = Router();


routerProducts.get('/', [], async (req, res) => {
    const contenedor = new Contenedor('./db_files/productos.txt');
    const productos = await contenedor.getAll();
    return res.json(productos);
});


routerProducts.get('/:id',[] , async (req, res) => {
    const contenedor = new Contenedor('./db_files/productos.txt');
    const id = +req.params.id;
    const producto = await contenedor.getById(id)
    return (producto)
        ? res.json(producto)
        : res.status(404).json(notFoundMessage(id));
});


routerProducts.post('/', [ isAdminMiddleware ], async (req, res) => {
    const contenedor = new Contenedor('./db_files/productos.txt');
    const data = {...req.body, 'timestamp': Date.now()};
    const producto = await contenedor.create(data);
    return res.status(201).json(producto);
});

routerProducts.put('/:id', [ isAdminMiddleware ] ,async (req, res) => {
    const contenedor: Contenedor = new Contenedor('./db_files/productos.txt');
    const  id  = +req.params.id;
    const productoToUpdate = await contenedor.getById(id);
    if(!productoToUpdate)
        return res.status(404).json(notFoundMessage(id));

    if(req.body.id && id !== req.body.id)
        return res.status(400).json({'mensaje': `No coinciden los id's del producto`});

    const data = { ...productoToUpdate, ...req.body, id };
    const producto = await contenedor.update(data);
    return (producto !== -1)
        ? res.status(200).json(producto)
        : res.status(404).json(notFoundMessage(id));
});

routerProducts.delete('/:id', [ isAdminMiddleware ], async (req, res) => {
    const contenedor = new Contenedor('./db_files/productos.txt');
    const id  = +req.params.id;
    const deletedId = await contenedor.deleteById(id);
    return (deletedId !== -1)
        ? res.json({'mensaje': `Producto con id: '${ id }' fue eliminado`})
        : res.status(404).json(notFoundMessage(id));
});

export const notFoundMessage = (id) => {
    return {'mensaje': `No se encontró el producto con el id: '${id}'.`}
}

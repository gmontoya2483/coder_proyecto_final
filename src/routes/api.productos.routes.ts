import { Router } from 'express';
import { isAdminMiddleware } from '../middlewares/is-admin.middleware';
import { ProductosDao } from '../daos';
export const routerApiProducts: Router = Router();


routerApiProducts.get('/', [], async (req, res) => {
    const contenedor = new ProductosDao();
    const productos = await contenedor.getAll();
    return res.json(productos);
});


routerApiProducts.get('/:id',[] , async (req, res) => {
    const contenedor = new ProductosDao();
    const id = req.params.id;
    const producto = await contenedor.getById(id)
    return (producto)
        ? res.json(producto)
        : res.status(404).json(notFoundMessage(id));
});


routerApiProducts.post('/', [ isAdminMiddleware ], async (req, res) => {
    const contenedor = new ProductosDao();
    const data = {...req.body, 'timestamp': Date.now()};
    const producto = await contenedor.create(data);
    return res.status(201).json(producto);
});

routerApiProducts.put('/:id', [ isAdminMiddleware ] ,async (req, res) => {
    const contenedor = new ProductosDao();
    const  id  = req.params.id;
    const productoToUpdate = await contenedor.getById(id);
    if(!productoToUpdate)
        return res.status(404).json(notFoundMessage(id));



    if((req.body.id && id !== req.body.id) || (req.body._id && id !== req.body._id))
        return res.status(400).json({'mensaje': `No coinciden los id's del producto`});

    const data = {
        nombre: productoToUpdate.nombre,
        descripcion: productoToUpdate.descripcion,
        codigo: productoToUpdate.codigo,
        foto: productoToUpdate.foto,
        stock: productoToUpdate.stock,
        timestamp: productoToUpdate.timestamp,
        ...req.body,
        id
    };

    const producto = await contenedor.update(data);
    return (producto !== -1)
        ? res.status(200).json(producto)
        : res.status(404).json(notFoundMessage(id));
});

routerApiProducts.delete('/:id', [ isAdminMiddleware ], async (req, res) => {
    const contenedor = new ProductosDao();
    const id  = req.params.id;
    const deletedId = await contenedor.deleteById(id);
    return (deletedId === -1 || deletedId === null)
        ? res.status(404).json(notFoundMessage(id))
        : res.json({'mensaje': `Producto con id: '${ id }' fue eliminado`});
});

export const notFoundMessage = (id) => {
    return {'mensaje': `No se encontró el producto con el id: '${id}'.`}
}

# Proyecto Final

## Primera entrega

### Consigna
Deberás entregar el estado de avance de tu aplicación eCommerce Backend, que implemente un servidor de aplicación basado
en la plataforma Node.js y el módulo express. El servidor implementará dos conjuntos de rutas agrupadas en routers, 
uno con la url base __'/productos'__ y el otro con __'/carrito'__. El puerto de escucha será el __8080__ para desarrollo y 
```process.env.PORT``` para producción en glitch.com

### Aspectos a incluir en el entregable: 

1. El router base __'/api/productos'__ implementará cuatro funcionalidades:  
   - ___GET: '/:id?'___ - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores).  
   - ___POST: '/'___ - Para incorporar productos al listado (disponible para administradores).
   - ___PUT: '/:id'___ - Actualiza un producto por su id (disponible para administradores)
   - ___DELETE: '/:id'___ - Borra un producto por su id (disponible para administradores)

2. El router base '/api/carrito' implementará tres rutas disponibles para usuarios y administradores:
   - ___POST: '/'___ - Crea un carrito y devuelve su id. 
   - ___DELETE: '/:id'___ - Vacía un carrito y lo elimina. 
   - ___GET: '/:id/productos'___ - Me permite listar todos los productos guardados en el carrito 
   - ___POST: '/:id/productos'___ - Para incorporar productos al carrito por su id de producto 
   - ___DELETE: '/:id/productos/:id_prod'___ - Eliminar un producto del carrito por su id de carrito y de producto

3. Crear una variable booleana administrador, cuyo valor configuraremos más adelante con el sistema de login. Según su valor (__true__ ó __false__) me permitirá alcanzar o no las rutas indicadas. En el caso de recibir un request a una ruta no permitida por el perfil, devolver un objeto de error.   
Ejemplo: ```{ error : -1, descripcion: ruta 'x' método 'y' no autorizada }```

4. Un __producto__ dispondrá de los siguientes campos:  ```id, timestamp, nombre, descripcion, código, foto (url), precio, stock```.
5. El __carrito de compras__ tendrá la siguiente estructura:  
   ```id, timestamp(carrito), productos: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }```
6. El timestamp puede implementarse con ```Date.now()```
7. Realizar la persistencia de productos y del carrito de compras en el filesystem.

### A tener en cuenta:
1. Para realizar la __prueba de funcionalidad__ hay dos opciones:
   - Probar con postman cada uno de los endpoints (productos y carrito) y su operación en conjunto.
   - Realizar una aplicación frontend sencilla, utilizando HTML/CSS/JS ó algún framework de preferencia, que represente el listado de productos en forma de cards. En cada card figuran los datos del producto, que, en el caso de ser administradores, podremos editar su información. Para este último caso incorporar los botones actualizar y eliminar. También tendremos un formulario de ingreso de productos nuevos con los campos correspondientes y un botón enviar. Asimismo, construir la vista del carrito donde se podrán ver los productos agregados e incorporar productos a comprar por su id de producto. Esta aplicación de frontend debe enviar los requests get, post, put y delete al servidor utilizando fetch y debe estar ofrecida en su espacio público.
2. En todos los casos, el diálogo entre el frontend y el backend debe ser en formato __JSON__. El servidor no debe generar ninguna vista.
3. En el caso de requerir una ruta no implementada en el servidor, este debe contestar un objeto de error: ej ```{ error : -2, descripcion: ruta 'x' método 'y' no implementada}```
4. La estructura de programación será ECMAScript, separada tres en módulos básicos (router, lógica de negocio/api y persistencia ). Más adelante implementaremos el desarrollo en capas. Utilizar preferentemente clases, constructores de variables let y const y arrow function.
5. Realizar la prueba de funcionalidad completa en el ámbito local (puerto 8080) y en glitch.com

## Desarrollo

>__NOTA:__ para simular el acceso como usuario común o administrador se definió la siguiente constante:  
> ```IS_ADMIN: boolean``` en el archivo ```server.ts```
> ```typescript
> /* ------------- VARIABLE IS_ADMIN ------------------ */
> export const IS_ADMIN: boolean = true;
>```

Se debe tener instalado __nodemon__
```
npm install -g nodemon
```

1) Se debe tener 2 terminales abiertas corriendo en cada una de ellas los siguientes comandos
```
npm run start:dev
```
y 
```
npm run serve:dev
```

## Build y producción

1) Ejecutar el siguiente comando para generar el build:
```
npm run build
```
2) Ejecutar el siguiente comando para ejecutar en modo produccion:
```
npm start
```






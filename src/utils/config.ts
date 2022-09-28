export const config = {
    mongoDB: {
        host: 'localhost',
        port: 27017,
        dbName: 'ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }
    },
    ArchivoDB: {
        productos: './db_files/productos.txt',
        carritos: './db_files/carritos.txt'
    }
}

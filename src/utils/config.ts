import dotenv from 'dotenv';
dotenv.config();

export const config = {
    ArchivoDB: {
        productos: './db_files/productos.txt',
        carritos: './db_files/carritos.txt'
    },
    mongoDB: {
        protocol: process.env.MONGO_DB_PROTOCOL || 'mongodb',
        url: process.env.MONGO_DB_URL || 'localhost:27017',
        dbName: process.env.MONGO_DB_NAME || 'ecommerce',
        secret_key: process.env.MONGO_SECRET_KEY || '1234567',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }
    },
    server: {
        container: process.env.CONTAINER || 'mongo-db',
        mode: process.env.MODE || 'FORK',
        port: process.env.PORT || 8080,
        environment: process.env.NODE_ENV || 'development'
    },
    email: {
        emailAccount: process.env.EMAIL_ACCOUNT,
        emailAccountPassword: process.env.EMAIL_ACCOUNT_PASSWORD,
        administratorEmail: process.env.ADMINISTRATOR_EMAIL
    },
    twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN,
        administratorPhone: process.env.ADMINISTRATOR_PHONE
    }
}

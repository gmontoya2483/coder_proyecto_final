import dotenv from 'dotenv';
// dotenv.config();

export const config = {
    ArchivoDB: {
        productos: './db_files/productos.txt',
        carritos: './db_files/carritos.txt'
    },
    mongoDB: {
        protocol: process.env.MONGO_DB_PROTOCOL,
        url: process.env.MONGO_DB_URL,
        dbName: process.env.MONGO_DB_NAME,
        secret_key: process.env.MONGO_SECRET_KEY,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }
    },
    server: {
        container: process.env.CONTAINER,
        mode: process.env.MODE,
        port: process.env.PORT,
        environment: process.env.NODE_ENV
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

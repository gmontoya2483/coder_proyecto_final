import {ContenedorInterface} from '../interfaces/contenedor.interface';
import admin from 'firebase-admin';
import serviceAccount from '../service-account.json';

const params = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url
}
admin.initializeApp({credential: admin.credential.cert(params)});

export class ContenedorFireBase implements ContenedorInterface {
    private db = admin.firestore();
    private collection: admin.firestore.CollectionReference<admin.firestore.DocumentData>;
    private readonly collectionName: string;


    constructor(collection: string) {
        this.collectionName = collection;
        this.collection = this.db.collection(this.collectionName)
    }

    async create(data): Promise<any> {
        try {
            let doc = this.collection.doc();
            await doc.create(data);
            return {id: doc.id, ...data}
        }catch (err) {
            console.error(`${this.collectionName}, ${ err }`);
            throw new Error(`No se pudo crear la entidad - ${this.collectionName}`);
        }
    }


    async deleteById(id): Promise<any> {
        try {
            const doc = this.collection.doc(`${id}`);
            const entityToDelete = await this.getById(id);
            if (!entityToDelete) return null;
            return await doc.delete();
        } catch (err) {
            console.error(`${this.collectionName}, ${ err }`);
            throw new Error(`No se pudo borrar entidad - ${this.collectionName}`);
        }

    }

    async getAll(): Promise<any> {
        try {
            let collectionList = await this.collection.get()
            return  collectionList.docs.map((doc)=> ({
                id: doc.id,
                nombre: doc.data().nombre,
                descripcion: doc.data().descripcion,
                codigo: doc.data().codigo,
                foto: doc.data().foto,
                precio: doc.data().precio,
                stock: doc.data().stock,
                timestamp: doc.data().timestamp
            }));
        } catch (err) {
            console.error(`${this.collectionName}, ${ err }`);
            throw new Error(`No se pudo buscar entidades - ${this.collectionName}`);
        }

    }

    async getById(id): Promise<any> {
        try {
            let doc = this.collection.doc(`${id}`);
            const response = await doc.get();
            return (response.data()) ? {...response.data(), id} : null;
        } catch (err) {
            console.error(`${this.collectionName}, ${ err }`);
            throw new Error(`No se pudo buscar entidad - ${this.collectionName}`);
        }
    }

    async update(data): Promise<any> {
        const {id, ...obj}  = data;
        try {
            const doc = this.collection.doc(`${id}`);
            const entityToUpdate = await this.getById(id);
            if (!entityToUpdate) return null;
            await doc.update(obj);
            return {...entityToUpdate, ...obj, id};
        } catch (err) {
            console.error(`${this.collectionName}, ${ err }`);
            throw new Error(`No se pudo modificar entidad - ${this.collectionName}`);
        }
    }

}

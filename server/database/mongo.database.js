import { MongoClient } from 'mongodb';
class Database {
    constructor(username, password, cluster) {
        this.username = "";
        this.password = "";
        this.cluster = "";
        this.client = undefined;
        this.connectionEstablished = false;
        this.client = new MongoClient(`mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`);
    }
    /* Connect to the database */
    async connect() {
        try {
            if (this.client === undefined)
                throw new Error('client is undefined');
            return this.connectionEstablished = !!await this.client.connect();
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    /* Get one value from a document in a collection in a database */
    async get(database, collection, query) {
        try {
            if (!this.connectionEstablished)
                throw new Error('Connection has\'t already been established with .connect()');
            if (!this.client)
                throw new Error('Client is undefined');
            return await this.client.db(database).collection(collection).findOne(query);
        }
        catch (err) {
            return false;
        }
    }
    async set(database, collection, data) {
        try {
            if (!this.connectionEstablished)
                throw new Error('Connection has\'t already been established with .connect()');
            if (!this.client)
                throw new Error('Client is undefined');
            return await this.client.db(database).collection(collection).insertOne(data);
        }
        catch (err) {
            return false;
        }
    }
}
export default Database;

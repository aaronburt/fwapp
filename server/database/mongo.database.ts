import { MongoClient, ObjectId } from 'mongodb';

interface DatabaseLogin {
    username: string,
    password: string,
    cluster: string,
    client: MongoClient | undefined
}


class Database implements DatabaseLogin {

    public username: string = "";
    public password: string = "";
    public cluster: string = "";
    public client: MongoClient | undefined = undefined;

    public connectionEstablished: boolean = false;

    constructor(username: string, password: string, cluster: string){
        this.client = new MongoClient(`mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`);
    }

    /* Connect to the database */ 
    async connect(){
        try {
            if(this.client === undefined) throw new Error('client is undefined');
            return this.connectionEstablished = !!await this.client.connect();
        } catch(err: any){
            console.log(err)
            return false;
        }
    }

    /* Get one value from a document in a collection in a database */
    async get(database: string, collection: string, query: Record<any, any>){
        try {
            if(!this.connectionEstablished) throw new Error('Connection has\'t already been established with .connect()');
            if(!this.client) throw new Error('Client is undefined')
            return await this.client.db(database).collection(collection).findOne(query);
        } catch(err: any){
            return false;
        }
    }

    async set(database: string, collection: string, data: Record<any, any>){
        try {
            if(!this.connectionEstablished) throw new Error('Connection has\'t already been established with .connect()');
            if(!this.client) throw new Error('Client is undefined')
            return await this.client.db(database).collection(collection).insertOne(data);
        } catch(err){
            return false;
        }
    }
}

export default Database;

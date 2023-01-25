import { MongoClient } from 'mongodb';
interface DatabaseLogin {
    username: string;
    password: string;
    cluster: string;
    client: MongoClient | undefined;
}
declare class Database implements DatabaseLogin {
    username: string;
    password: string;
    cluster: string;
    client: MongoClient | undefined;
    connectionEstablished: boolean;
    constructor(username: string, password: string, cluster: string);
    connect(): Promise<boolean>;
    get(database: string, collection: string, query: Record<any, any>): Promise<false | import("mongodb").WithId<import("bson").Document> | null>;
    set(database: string, collection: string, data: Record<any, any>): Promise<false | import("mongodb").InsertOneResult<import("bson").Document>>;
}
export default Database;
//# sourceMappingURL=mongo.database.d.ts.map
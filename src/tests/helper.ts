import * as mongoose from 'mongoose';
import { IProviderOptions, MongoDbProvider } from '../';

export default class Helper {
    static provider: MongoDbProvider;

    static createProvider(options: IProviderOptions) {
        this.provider = new MongoDbProvider(options);
    }

    static createConnection(connStr: string) {
        return new Promise<mongoose.Connection>((resolve, reject) => {
            var conn = mongoose.createConnection(connStr);
            conn.on('connected', (connx) => {
                resolve(conn);
            })
            conn.on('error', (err) => {
                reject(err);
            })
        })
    }
}
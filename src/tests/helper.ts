import * as mongoose from 'mongoose';
import { IProviderOptions, MongoDbProvider } from '../';

export default class Helper {
    static provider: MongoDbProvider;

    static createProvider(options: IProviderOptions) {
        this.provider = new MongoDbProvider(options);
    }

    static createConnection(connStr: string) {
        return new Promise<mongoose.Connection>((resolve, reject) => {
            var oc = mongoose.connect(connStr);
            var conn = mongoose.connection;
            conn.on('connected', (connx) => {
                require('../db/dashboard').default(conn);
                resolve(conn);
            })

            conn.on('error', (err) => {
                reject(err);
            })


        })
    }
}
import * as mongoose from 'mongoose';
import { IProviderOptions, MongoDbProvider } from '../';

export default class Helper {
    static provider: MongoDbProvider;
    static testUser: string = "user_" + Math.ceil(Math.random() * 999999);
    static appid: string = "appid_" + Math.ceil(Math.random() * 999999);
    static utcNow() {
        var now = new Date();
        var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
        return now_utc;
    }

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
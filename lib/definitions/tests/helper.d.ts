/// <reference types="es6-promise" />
/// <reference types="mongoose" />
import * as mongoose from 'mongoose';
import { IProviderOptions, MongoDbProvider } from '../';
export default class Helper {
    static provider: MongoDbProvider;
    static testUser: string;
    static appid: string;
    static createProvider(options: IProviderOptions): void;
    static createConnection(connStr: string): Promise<mongoose.Connection>;
}

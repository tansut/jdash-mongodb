/// <reference types="mongoose" />
import * as mongoose from 'mongoose';
export interface IDBDocument extends mongoose.Document {
}
export declare class DBSchema extends mongoose.Schema {
    toClient<T extends Object>(doc: IDBDocument, c?: {
        new (): T;
    }): T;
    preSave(doc: IDBDocument, next: Function): void;
    constructor(definition?: mongoose.SchemaDefinition, options?: mongoose.SchemaOptions);
}
export interface DBModel<T extends IDBDocument> extends mongoose.Model<T> {
}

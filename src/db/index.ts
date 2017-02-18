import * as mongoose from 'mongoose';

export interface IDBDocument extends mongoose.Document {

}


export class DBSchema extends mongoose.Schema {

    toClient<T extends Object>(doc: IDBDocument, c?: { new (): T; }): T {
        var result;
        if (c) {
            result = new c();
            var docObject = doc.toObject();
            for (var prop in docObject) {
                if (docObject.hasOwnProperty(prop)) {
                    var propVal = doc[<string>prop];
                    if (typeof propVal != 'undefined' && result.hasOwnProperty(prop))
                        result[prop] = propVal;
                }
            }
        } else result = doc.toObject();
        delete result['__v'];
        delete result['_meta'];
        return result;
    }

    preSave(doc: IDBDocument, next: Function) {
        next()
        // try {
        //     if (!doc.isNew) {
        //         doc._meta.updated = moment.utc().toDate();
        //     } else {
        //     }
        //     next();
        // } catch (err) {
        //     next(err)
        // }
    }

    // static getMetaDefinition(): mongoose.SchemaDefinition {
    //     return {
    //         created: { type: Date, required: true, default: moment.utc },
    //         updated: { type: Date, required: false },
    //         owner: { type: mongoose.Schema['ObjectId'], required: false, ref: 'Users' }
    //     }
    // }

    constructor(definition?: mongoose.SchemaDefinition, options?: mongoose.SchemaOptions) {
        // definition['_meta'] || (definition['_meta'] = DBSchema.getMetaDefinition());
        super(definition, options);
        var self = this;
        this.pre('save', function (next: Function) {
            return self.preSave.apply(self, [this, next]);
        });
        this.method('toClient', function () {
            return self.toClient.apply(self, [this]);
        });
    }
}


export interface DBModel<T extends IDBDocument> extends mongoose.Model<T> {

}
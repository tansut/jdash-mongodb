import { DBModel, DBSchema, IDBDocument } from './';
import * as mongoose from 'mongoose';
import { ObjectID } from 'mongodb';



export class DashletEntity {
    moduleId: string;
    dashboardId: string;
    title?: string;
    description?: string;
    configuration?: { [key: string]: any; };
    createdAt: Date;
}

export interface IDashletDocument extends DashletEntity, IDBDocument {

}

class Schema extends DBSchema {

    toClient(doc: IDashletDocument) {
        var result = super.toClient(doc);
        return result;
    }
}

const DashletSchema = new Schema({
    moduleId: { type: String, required: true },
    dashboardId: { type: String, required: true },
    title: { type: String, required: false },
    description: { type: String, required: false },
    createdAt: { type: Date, required: true },
    configuration: { type: Object, required: false }
}, { strict: false })

DashletSchema.index({
    dashboardId: 1,
}, {});

DashletSchema.index({
    dashboardId: 1,
    createdAt: 1
}, {});


export let DashletEntityModel: DBModel<IDashletDocument>;


export default (conn: mongoose.Connection) => {
    DashletEntityModel = conn.model<IDashletDocument>('jdash_dashlet', DashletSchema);
    return DashletEntityModel;
};

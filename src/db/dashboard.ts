import { DashboardCreateModel } from 'jdash-core/lib';
import { DBModel, DBSchema, IDBDocument } from './';
import * as mongoose from 'mongoose';
import { ObjectID } from 'mongodb';



export class DashboardEntity {
    title: string;
    description: string;

}

export interface IDashboardDocument extends DashboardEntity, IDBDocument {

}

class Schema extends DBSchema {

    toClient(doc: IDashboardDocument) {
        var result = super.toClient(doc);
        return result;
    }
}

const DashboardSchema = new Schema({
    title: { type: String, required: false },
    description: { type: String, required: false }
})

export let DashboardEntityModel: DBModel<IDashboardDocument>;


export default (conn: mongoose.Connection) => {
    DashboardEntityModel = conn.model<IDashboardDocument>('dash', DashboardSchema);
    return DashboardEntityModel;
};

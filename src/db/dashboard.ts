import { DashboardCreateModel, LayoutModel } from 'jdash-core/lib';
import { DBModel, DBSchema, IDBDocument } from './';
import * as mongoose from 'mongoose';
import { ObjectID } from 'mongodb';



export class DashboardEntity {
    title: string;
    description: string;
    user: string;
    createdAt: Date;
    config: { [key: string]: any };
    layout: LayoutModel
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
    description: { type: String, required: false },
    user: { type: String, required: true },
    createdAt: { type: Date, required: true },
    layout: { type: Object, required: true } 
})

export let DashboardEntityModel: DBModel<IDashboardDocument>;


export default (conn: mongoose.Connection) => {
    DashboardEntityModel = conn.model<IDashboardDocument>('jdash_dashboard', DashboardSchema);
    return DashboardEntityModel;
};

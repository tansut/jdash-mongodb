import { DashboardCreateModel, LayoutModel } from 'jdash-core/lib';
import { DBModel, DBSchema, IDBDocument } from './';
import * as mongoose from 'mongoose';
import { ObjectID } from 'mongodb';



export class DashboardEntity {
    appid: string;
    title?: string;
    description?: string;
    user: string;
    createdAt: Date;
    shareWith?: string;
    config?: { [key: string]: any };
    layout?: LayoutModel
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
    appid: { type: String, required: true },
    title: { type: String, required: false },
    description: { type: String, required: false },
    shareWith: { type: String, required: false },
    user: { type: String, required: true },
    createdAt: { type: Date, required: true },
    layout: { type: Object, required: true }
})

DashboardSchema.index({
    appid: 1,
    user: 1
}, {});

DashboardSchema.index({
    appid: 1,
    createdAt: 1
}, {});


DashboardSchema.index({
    appid: 1,
    shareWith: 1
}, {});


export let DashboardEntityModel: DBModel<IDashboardDocument>;


export default (conn: mongoose.Connection) => {
    DashboardEntityModel = conn.model<IDashboardDocument>('jdash_dashboard', DashboardSchema);
    return DashboardEntityModel;
};

/// <reference types="mongoose" />
import { DBModel, IDBDocument } from './';
import * as mongoose from 'mongoose';
export declare class DashboardEntity {
    title: string;
    description: string;
}
export interface IDashboardDocument extends DashboardEntity, IDBDocument {
}
export declare let DashboardEntityModel: DBModel<IDashboardDocument>;
declare var _default: (conn: mongoose.Connection) => DBModel<IDashboardDocument>;
export default _default;

/// <reference types="mongoose" />
import { DBModel, IDBDocument } from './';
import * as mongoose from 'mongoose';
export declare class DashletEntity {
    moduleId: string;
    dashboardId: string;
    title?: string;
    description?: string;
    configuration?: {
        [key: string]: any;
    };
    createdAt: Date;
}
export interface IDashletDocument extends DashletEntity, IDBDocument {
}
export declare let DashletEntityModel: DBModel<IDashletDocument>;
declare var _default: (conn: mongoose.Connection) => DBModel<IDashletDocument>;
export default _default;

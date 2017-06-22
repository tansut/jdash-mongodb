/// <reference types="mongoose" />
import { LayoutModel } from 'jdash-core/lib';
import { DBModel, IDBDocument } from './';
import * as mongoose from 'mongoose';
export declare class DashboardEntity {
    appid: string;
    title?: string;
    description?: string;
    user: string;
    createdAt: Date;
    shareWith?: string;
    config?: {
        [key: string]: any;
    };
    layout?: LayoutModel;
}
export interface IDashboardDocument extends DashboardEntity, IDBDocument {
}
export declare let DashboardEntityModel: DBModel<IDashboardDocument>;
declare const _default: (conn: mongoose.Connection) => DBModel<IDashboardDocument>;
export default _default;

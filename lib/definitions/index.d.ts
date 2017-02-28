/// <reference types="mongoose" />
/// <reference types="es6-promise" />
import { IDBProvider, ISearchDashboard, ISearchDashlet } from 'jdash-api-core';
import * as core from 'jdash-core';
import * as mongoose from 'mongoose';
import { IDashboardDocument } from './db/dashboard';
import { IDashletDocument } from './db/dashlet';
import { DBModel } from './db';
export interface IProviderOptions {
    connection: mongoose.Connection;
}
export declare class MongoDbProvider implements IDBProvider {
    options: IProviderOptions;
    connection: mongoose.Connection;
    dashboardModel: DBModel<IDashboardDocument>;
    dashletModel: DBModel<IDashletDocument>;
    constructor(options: IProviderOptions);
    private dashDocumentToDashModel(e);
    private dashletDocumentToModel(e);
    searchDashboards(search: ISearchDashboard, query?: core.Query): Promise<core.QueryResult<core.DashboardModel>>;
    getDashboard(appid: string, id: string): Promise<core.GetDashboardResult>;
    createDashboard(appid: string, model: core.DashboardModel): Promise<core.CreateResult>;
    deleteDashboard(appid: string, id: string): Promise<any>;
    updateDashboard(appid: string, id: string, updateValues: core.DashboardUpdateModel): Promise<any>;
    createDashlet(model: core.DashletCreateModel): Promise<core.CreateResult>;
    searchDashlets(search: ISearchDashlet): Promise<Array<core.DashletModel>>;
    deleteDashlet(id: string | Array<string>): Promise<any>;
    updateDashlet(id: string, updateValues: core.DashletUpdateModel): Promise<any>;
}
declare var _default: (options: IProviderOptions) => MongoDbProvider;
export default _default;

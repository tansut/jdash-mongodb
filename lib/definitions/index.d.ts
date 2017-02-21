/// <reference types="mongoose" />
/// <reference types="es6-promise" />
import { IDBProvider, ISearchDashboard } from 'jdash-api-core';
import { CreateResult, Query, QueryResult, DashboardModel, DashboardCreateModel } from 'jdash-core';
import * as mongoose from 'mongoose';
import { IDashboardDocument } from './db/dashboard';
import { DBModel } from './db';
export interface IProviderOptions {
    connection: mongoose.Connection;
}
export declare class MongoDbProvider implements IDBProvider {
    options: IProviderOptions;
    connection: mongoose.Connection;
    dashboardModel: DBModel<IDashboardDocument>;
    constructor(options: IProviderOptions);
    private dashDocumentToDashModel(e);
    searchDashboards(search: ISearchDashboard, query?: Query): Promise<QueryResult<DashboardModel>>;
    getDashboard(appid: string, id: string): Promise<DashboardModel>;
    createDashboard(appid: string, model: DashboardCreateModel): Promise<CreateResult>;
}
declare var _default: (options: IProviderOptions) => MongoDbProvider;
export default _default;

/// <reference types="mongoose" />
/// <reference types="es6-shim" />
import { CreateResult, IJDashProvider, Query, QueryResult, DashboardModel, DashboardCreateModel } from 'jdash-core';
import * as mongoose from 'mongoose';
export interface IProviderOptions {
    connection: mongoose.Connection;
}
export declare class MongoDbProvider implements IJDashProvider {
    options: IProviderOptions;
    constructor(options: IProviderOptions);
    getDashboardsOfUser(username: string, query?: Query): Promise<QueryResult<DashboardModel>>;
    getDashboard(id: string): Promise<DashboardCreateModel>;
    createDashboard(model: DashboardCreateModel): Promise<CreateResult>;
}
declare var _default: (options: IProviderOptions) => MongoDbProvider;
export default _default;

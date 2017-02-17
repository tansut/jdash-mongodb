import { CreateResult, IJDashProvider, Query, QueryResult, DashboardModel, DashboardCreateModel } from 'jdash-core';
import * as mongoose from 'mongoose';

export interface IProviderOptions {
    connection: mongoose.Connection;
}

export class MongoDbProvider implements IJDashProvider {
    constructor(public options: IProviderOptions) {

    }

    getDashboardsOfUser(username: string, query?: Query): Promise<QueryResult<DashboardModel>> {
        return null;
    }

    getDashboard(id: string): Promise<DashboardCreateModel> {
        return null;
    }

    createDashboard(model: DashboardCreateModel): Promise<CreateResult> {
        return null;
    }
}

export default (options: IProviderOptions) => new MongoDbProvider(options);
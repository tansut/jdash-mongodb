import { CreateResult, IJDashProvider, Query, QueryResult, DashboardModel, DashboardCreateModel } from 'jdash-core';
import * as mongoose from 'mongoose';
import { IDashboardDocument, DashboardEntity, DashboardEntityModel } from './db/dashboard';
import dashboard from './db/dashboard';
import { DBModel } from './db';

export interface IProviderOptions {
    connection: mongoose.Connection;
}

export class MongoDbProvider implements IJDashProvider {
    connection: mongoose.Connection;
    dashboardModel: DBModel<IDashboardDocument>;

    constructor(public options: IProviderOptions) {
        this.connection = options.connection;
        this.dashboardModel = dashboard(this.connection);
    }

    // private getUsername() {
    //     this.options.credentialCallback && this.options.credentialCallback();
    // }

    getDashboardsOfUser(username: string, query?: Query): Promise<QueryResult<DashboardModel>> {
        return null;
    }

    getDashboard(id: string): Promise<DashboardCreateModel> {
        return null;
    }

    createDashboard(model: DashboardCreateModel): Promise<CreateResult> {
        var newEntity: DashboardEntity = {
            title: model.title,
            description: model.description
        }

        return this.dashboardModel.create(newEntity).then(newDocument => {
            var createResult: CreateResult = {
                id: newDocument._id.toString()
            };
            return createResult;
        })
    }
}

(<any>mongoose).Promise = global.Promise;
export default (options: IProviderOptions) => new MongoDbProvider(options);
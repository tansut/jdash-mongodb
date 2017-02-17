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
        // var newItem = new DashboardEntityModel(newEntity);
        // return newItem.save((err, d) => {
        //     debugger;
        // }).then(item => {
        //     debugger;
        //     var createResult: CreateResult = {
        //         id: item._id.toString()
        //     };
        //     return createResult;
        // })
        // return new Promise((res, rej) => {
        //     debugger;
        //     var conn = this.connection;
        //     var conn2 = mongoose;
        //     //var m1 = this.connection.model<IDashboardDocument>('dashboard');

        //     //var m = mongoose.connection.model<IDashboardDocument>('dashboard');
        //     DashboardEntityModel.create({}, )
        //     // DashboardEntityModel.find().then((res) => {
        //     //     debugger;
        //     // })
        // })
        return this.dashboardModel.create(newEntity).then(newDocument => {
            debugger;
            var createResult: CreateResult = {
                id: newDocument._id.toString()
            };
            return createResult;
        })
    }
}

// (<any>mongoose).Promise = global.Promise;
mongoose.set('debug', true);


export default (options: IProviderOptions) => new MongoDbProvider(options);
import { LayoutModel, Metadata } from 'jdash-core/lib';
import { CreateResult, IJDashProvider, Query, QueryResult, DashboardModel, DashboardCreateModel } from 'jdash-core';
import * as mongoose from 'mongoose';
import { IDashboardDocument, DashboardEntity, DashboardEntityModel } from './db/dashboard';
import dashboard from './db/dashboard';
import { DBModel } from './db';
import helper from './helper';

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

    private dashDocumentToDashModel(e: IDashboardDocument): DashboardModel {
        return <DashboardModel>{
            config: e.config,
            description: e.description,
            id: e._id.toString(),
            layout: e.layout,
            title: e.title
        }
    }

    getDashboardsOfUser(username: string, query?: Query): Promise<QueryResult<DashboardModel>> {
        var userQuery = this.dashboardModel.find({ 'user': username });
        var countQuery = this.dashboardModel.find({ 'user': username }).count();
        var selectQuery;

        if (query) {
            selectQuery = userQuery.sort({ createdAt: -1 }).skip(query.startFrom).limit(query.limit);
        } else {
            selectQuery = userQuery;
        }

        selectQuery = selectQuery.then((dashEntities) => {
            return dashEntities.map(this.dashDocumentToDashModel);
        });

        var resultPromise = Promise.all<any>([countQuery, userQuery]).then((results) => {
            var count = <number>results[0];
            var models = <Array<DashboardModel>>results[1];

            var hasMore = false;
            if (query) {
                if (query.limit + query.startFrom < count)
                    hasMore = true;
            } else {
                hasMore = count > models.length;
            }

            var returnValue = <QueryResult<DashboardModel>>{
                data: models,
                hasMore: hasMore
            }
            return returnValue;
        });

        return resultPromise;
    }

    getDashboard(id: string): Promise<DashboardModel> {
        return this.dashboardModel.findById(id).then((item) => { return this.dashDocumentToDashModel(item); });
    }

    createDashboard(model: DashboardCreateModel): Promise<CreateResult> {
        var newEntity: DashboardEntity = {
            title: model.title,
            description: model.description,
            user: model.user,
            createdAt: helper.utcNow(),
            config: model.config || {},
            layout: <LayoutModel>{
                config: {},
                dashlets: {}
            }
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
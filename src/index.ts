import { IDBProvider, ISearchDashboard } from 'jdash-api/lib/definitions';
import { LayoutModel, Metadata } from 'jdash-core/lib';
import { CreateResult, Query, QueryResult, DashboardModel, DashboardCreateModel } from 'jdash-core';
import * as mongoose from 'mongoose';
import { IDashboardDocument, DashboardEntity, DashboardEntityModel } from './db/dashboard';
import dashboard from './db/dashboard';
import { DBModel } from './db';
import helper from './helper';

export interface IProviderOptions {
    connection: mongoose.Connection;
}

export class MongoDbProvider implements IDBProvider {
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
            title: e.title,
            shareWith: e.shareWith
        }
    }

    searchDashboards(search: ISearchDashboard, query?: Query): Promise<QueryResult<DashboardModel>> {
        query = query || {
            limit: 100,
            startFrom: 0
        }
        query.limit = Math.min(query.limit, 100);
        search = search || {};

        search.appid && (search.appid = (typeof search.appid == 'string' ? [search.appid] : search.appid));
        search.user && (search.user = (typeof search.user == 'string' ? [search.user] : search.user));
        search.shareWith && (search.shareWith = (typeof search.shareWith == 'string' ? [search.shareWith] : search.shareWith));

        var q = <any>{};

        search.appid && (q.appid = { $in: search.appid });
        search.user && (q.user = { $in: search.user });
        var baseQuery = this.dashboardModel.find(q).sort({ createdAt: -1 }).skip(query.startFrom).limit(query.limit + 1); // 1 for haMore query


        return baseQuery.then((dashEntities) => {
            var models = dashEntities.map(this.dashDocumentToDashModel);
            var hasMore = false; 
            if (models.length > query.limit){// hasMore check
                hasMore = true;
                models.splice(models.length -1,1); // remove +1 element from models
            }
            var returnValue = <QueryResult<DashboardModel>>{
                data: models,
                hasMore: hasMore
            }
            return returnValue;
        });

    }

    getDashboard(appid: string, id: string): Promise<DashboardModel> {
        return this.dashboardModel.findOne({ _id: id, appid: appid }).then((item) => { return this.dashDocumentToDashModel(item); });
    }

    createDashboard(appid: string, model: DashboardCreateModel): Promise<CreateResult> {
        var newEntity: DashboardEntity = {
            appid: appid,
            title: model.title,
            shareWith: model.shareWith,
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
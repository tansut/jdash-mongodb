import { IDBProvider, ISearchDashboard, ISearchDashlet } from 'jdash-api-core';
import { LayoutModel, Metadata } from 'jdash-core/lib';
import * as core from 'jdash-core';
import * as mongoose from 'mongoose';
import { IDashboardDocument, DashboardEntity, DashboardEntityModel } from './db/dashboard';
import { IDashletDocument, DashletEntity, DashletEntityModel } from './db/dashlet';

import dashlet from './db/dashlet';
import dashboard from './db/dashboard';
import { DBModel } from './db';
import helper from './helper';

export interface IProviderOptions {
    connection: mongoose.Connection;
}

export class MongoDbProvider implements IDBProvider {
    connection: mongoose.Connection;
    dashboardModel: DBModel<IDashboardDocument>;
    dashletModel: DBModel<IDashletDocument>;

    constructor(public options: IProviderOptions) {
        this.connection = options.connection;
        this.dashboardModel = dashboard(this.connection);
        this.dashletModel = dashlet(this.connection);
    }

    private dashDocumentToDashModel(e: IDashboardDocument): core.DashboardModel {
        return <core.DashboardModel>{
            config: e.config,
            description: e.description,
            id: e._id.toString(),
            layout: e.layout,
            title: e.title,
            shareWith: e.shareWith
        }
    }

    private dashletDocumentToModel(e: IDashletDocument): core.DashletModel {
        return <core.DashletModel>{
            configuration: e.configuration,
            dashboardId: e.dashboardId,
            description: e.description,
            id: e._id.toString(),
            moduleId: e.moduleId,
            title: e.title
        }
    }

    searchDashboards(search: ISearchDashboard, query?: core.Query): Promise<core.QueryResult<core.DashboardModel>> {
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
            if (models.length > query.limit) {// hasMore check
                hasMore = true;
                models.splice(models.length - 1, 1); // remove +1 element from models
            }
            var returnValue = <core.QueryResult<core.DashboardModel>>{
                data: models,
                hasMore: hasMore
            }
            return returnValue;
        });

    }

    getDashboard(appid: string, id: string): Promise<core.DashboardModel> {
        return this.dashboardModel.findOne({ _id: id, appid: appid }).then((item) => { return this.dashDocumentToDashModel(item); });
    }

    createDashboard(appid: string, model: core.DashboardCreateModel): Promise<core.CreateResult> {
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
            var createResult: core.CreateResult = {
                id: newDocument._id.toString()
            };
            return createResult;
        })
    }

    deleteDashboard(appid: string, id: string): Promise<any> {
        return this.dashboardModel.findOne({ _id: id, appid: appid }).then((dashboard) => {
            return dashboard.remove();
        });
    }

    updateDashboard(appid: string, id: string, updateValues: core.DashboardUpdateModel): Promise<any> {
        return this.dashboardModel.findOne({ _id: id, appid: appid }).then((dashboard) => {
            dashboard.config = updateValues.config;
            dashboard.title = updateValues.title;
            dashboard.shareWith = updateValues.shareWith;
            dashboard.layout = updateValues.layout;
            dashboard.description = updateValues.description;
            return dashboard.save();
        });
    }

    createDashlet(model: core.DashletCreateModel): Promise<core.CreateResult> {
        var newEntity: DashletEntity = {
            dashboardId: model.dashboardId,
            configuration: model.configuration || {},
            moduleId: model.moduleId,
            title: model.title,
            description: model.description,
            createdAt: helper.utcNow()
        }
        return this.dashletModel.create(newEntity).then(newDocument => {
            var createResult: core.CreateResult = {
                id: newDocument._id.toString()
            };
            return createResult;
        })
    }

    searchDashlets(search: ISearchDashlet): Promise<Array<core.DashletModel>> {
        var query = {
            dashboardId: search.dashboardId,
            user: <any>{}
        }

        if (search.user instanceof Array)
            query.user = { $in: search.user };
        else
            query.user = search.user;

        return this.dashletModel.find(query).then((dashletEntities) => {
            var models = dashletEntities.map(this.dashletDocumentToModel);
            return models;
        });
    }

    deleteDashlet(id: string): Promise<any> {
        return this.dashletModel.findById(id).then((dashletModel) => {
            return dashletModel.remove();
        });
    }
    updateDashlet(id: string, updateValues: core.DashletUpdateModel): Promise<any> {
        return this.dashletModel.findById(id).then((dashlet) => {
            dashlet.configuration = updateValues.configuration;
            dashlet.description = updateValues.description;
            dashlet.title = updateValues.title;
            return dashlet.save();
        });
    }

}

(<any>mongoose).Promise = global.Promise;
export default (options: IProviderOptions) => new MongoDbProvider(options);
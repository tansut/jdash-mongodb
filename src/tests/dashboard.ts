import { DashboardModel, DashboardCreateModel } from 'jdash-core';
import * as mocha from 'mocha';

import Helper from './helper';
import * as jcore from 'jdash-core';

export default function () {
    describe('dashboard', function () {
        var newDashboard: DashboardModel;
        it('should create a dashboard', function () {
            var provider = Helper.provider;

            var newDashboard: DashboardCreateModel = {
                title: 'Foo title',
                description: 'eewrew',
                id: ""
            }
            return provider.createDashboard(newDashboard).then(result => {
                newDashboard = {
                    id: result.id,
                    title: newDashboard.title,
                    description: newDashboard.title
                }
            })
        });
    });
}
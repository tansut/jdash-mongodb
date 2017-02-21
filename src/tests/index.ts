import * as mocha from 'mocha';
import Helper from './helper';
import dashboardtests from './dashboard';
import dashlettests from './dashlet';
require('should');

describe('jdash-mongodb Tests', function () {
    before(function (done) {
        var connStr = "mongodb://localhost/jdash-test";
        Helper.createConnection(connStr).then(conn => {
            Helper.createProvider({
                connection: conn
            })
            done();
        }).catch(err => done(err))
    });
    dashboardtests();
    dashlettests();
    after(function () {

    });
});
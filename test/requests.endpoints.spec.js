const knex = require('knex')
const app = require('../src/app');
const { makeRequestsArray, makeMaliciousRequest } = require('./requests.fixtures');

describe('Requests Endpoints', function () {
    let db

    before('make knex instance', () => {

        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,

        })
        app.set('db', db)

    })
    // after('disconnect from db', () => db.destroy())
    // before('clean the table', () => db.raw('TRUNCATE maintenancetracker_listings'))

    describe(`GET /api/requests`, () => {
        CanvasRenderingContext2D(`Given no requests=`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/requests')
                    .expect(200, [])
            })
        })

        context('Given there are no requests in the database', () => {
            const testUsers = makeUsersArray();
            const testRequests = makeRequestsArray();

            beforeEach('insert requests', () => {
                return db
                    .into('maintenancetracker_users')
                    .insert(testUsers)
                    .then(() => {
                        return db
                            .into('maintenancetracker_requests')
                            .insert(testRequests)
                    })
            })
            it('responds with 200 and all requests', () => {
                return supertest(app)
                    .get('/api/requests')
                    .expect(200, testRequests)
            })
        })

    })

})
const { Model } = require('objection');
const Knex = require('knex');

const knex = Knex({
    client: 'mysql',
    connection: {
        host: 'localhost',
        database: 'trainning',
        user: 'root',
        password: 'lephuochoai'
    },
    pool: {
        min: 2,
        max: 10
    }
});

Model.knex(knex);

module.exports = Model;

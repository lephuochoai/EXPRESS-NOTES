
exports.up = function (knex) {
    return knex.schema.createTable('tokens', (table) => {
        table.increments();
        table.string('user_id');
        table.string('token');
        table.integer('status');
        table.timestamps(true, true);
    })
};

exports.down = function (knex) {
    
};

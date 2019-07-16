
exports.up = function(knex) {
    return knex.schema.createTable('notes', (table) => {
        table.increments().unique().index();
        table.string('user_id');
        table.string('title');
        table.string('content');
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
  
};


exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        // id  
        table.increments();
        // table.integer('id').autoCreate();
        table.string('username').unique().index();
        table.string('password');
        table.string('name');
        table.string('email');
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
  
};

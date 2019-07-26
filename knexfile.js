// Update with your config settings.

module.exports = {
    client: 'mysql',
    connection: {
      host: 'localhost',
      database: 'trainning',
      user:     'root',
      password: 'lephuochoai'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
}
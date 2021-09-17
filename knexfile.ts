export default {
  development: {
    client: 'mysql',
    connection: {
      database: 'foodie',
      user: 'root',
      password: 'dev123',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`,
      extension: 'ts',
    },
  },
};

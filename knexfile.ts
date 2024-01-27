import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`,
      extension: 'ts',
    },
  },
};

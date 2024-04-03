import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    client: 'pg',
    connection: process.env.DEV_DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`,
      extension: 'ts',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.PROD_DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`,
      extension: 'ts',
    },
  },
};

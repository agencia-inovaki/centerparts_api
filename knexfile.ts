import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      database: process.env.DB_DATABASE_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`,
      extension: 'ts',
    },
  },
};

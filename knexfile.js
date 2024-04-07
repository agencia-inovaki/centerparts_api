import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

export default {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: '123',
      database: 'teste'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, 'src', 'database', 'migrations'),
      extension: 'ts'
    }
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.PROD_HOST,
      port: process.env.PROD_PORT,
      user: process.env.PROD_USER,
      password: process.env.PROD_PASSWORD,
      database: process.env.PROD_DATABASE
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, 'src', 'database', 'migrations'),
      extension: 'ts'
    }
  }
}
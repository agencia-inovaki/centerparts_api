'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const dotenv1 = require('dotenv')
const path1 = require('path')
dotenv1.config()
exports.default = {
  development: {
    client: 'pg',
    connection: process.env.DEV_DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
      directory: path1.join(__dirname, 'src', 'database', 'migrations'),
      extension: 'ts'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.PROD_DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
      directory: path1.join(__dirname, 'src', 'database', 'migrations'),
      extension: 'ts'
    }
  }
}

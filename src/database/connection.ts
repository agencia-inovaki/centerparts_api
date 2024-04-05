import KnexJS from 'knex'
import knexConfig from '../../knexfile'

// @ts-expect-error obs
export const knex = KnexJS(knexConfig[process.env.NODE_ENV ?? ''])

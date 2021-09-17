import KnexJS from 'knex';
import knexConfig from '../../knexfile';

export const knex = KnexJS(knexConfig.development);

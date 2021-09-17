import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('roles').then(exists => {
    if (exists) return;

    return knex.schema.createTable('roles', table => {
      table.increments('id').primary();

      table.string('name').notNullable();
      table.integer('uploads_quantity').notNullable();

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('roles');
}

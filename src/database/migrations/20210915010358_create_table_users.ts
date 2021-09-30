import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('users').then(async exists => {
    if (exists) return;

    await knex.schema.createTable('users', table => {
      table.string('user_id').primary().unique();

      table.string('name', 16).notNullable();
      table.string('username', 8).unique().notNullable();
      table.string('email').unique().notNullable();
      table.string('password', 16).notNullable();
      table.integer('gender').notNullable();
      table.string('biography');

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now()); // set when updating data
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.hasTable('users').then(async exists => {
    if (!exists) return;

    await knex.schema.dropTable('users');
  });
}

import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('users').then(exists => {
    if (exists) return;

    return knex.schema.createTable('users', table => {
      table.string('id').primary();

      table.string('name').notNullable();
      table.string('username').unique().notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.string('gender').notNullable();
      table.string('biography');
      table.integer('avatar_id').notNullable();
      table.integer('friends_count');

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}

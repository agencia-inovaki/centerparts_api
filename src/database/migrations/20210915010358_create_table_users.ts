import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('users').then(exists => {
    if (exists) return;

    return knex.schema.createTable('users', table => {
      table.increments('id').primary();

      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.string('username').unique().notNullable();
      table.string('name').notNullable();
      table.string('gender').notNullable();
      table.integer('avatar_id').notNullable();
      table.string('biography');
      table.integer('uploaded_recipes_count');
      table.integer('liked_recipes_count');
      table.integer('friends_count');
      table.string('status');

      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable('roles')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}

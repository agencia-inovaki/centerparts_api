import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('recipes').then(exists => {
    if (exists) return;

    return knex.schema.createTable('recipes', table => {
      table.increments('id').primary();

      table.string('title').notNullable();
      table.string('image').notNullable();
      table.integer('servings_count').notNullable();
      table.integer('preparation_minutes').notNullable();

      table
        .integer('author_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('recipes');
}

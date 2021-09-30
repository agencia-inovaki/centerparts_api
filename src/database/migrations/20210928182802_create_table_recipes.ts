import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('recipes').then(async exists => {
    if (exists) return;

    await knex.schema.createTable('recipes', table => {
      table.string('recipe_id').primary().unique();

      table.string('title').notNullable();
      table.integer('servings').notNullable();
      table.integer('ready_in_minutes').notNullable();

      table.string('author_id').notNullable();
      table
        .foreign('author_id')
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now()); // set when updating data
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.hasTable('recipes').then(async exists => {
    if (!exists) return;

    await knex.schema.dropTable('recipes');
  });
}

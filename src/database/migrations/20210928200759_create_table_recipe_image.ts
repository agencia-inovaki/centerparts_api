import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('recipe_image').then(async exists => {
    if (exists) return;

    await knex.schema.createTable('recipe_image', table => {
      table.string('image_id').primary().unique();

      table.string('key').notNullable();
      table.string('path').notNullable();

      table.string('recipe_id').notNullable();
      table
        .foreign('recipe_id')
        .references('recipe_id')
        .inTable('recipes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now()); // set when updating data
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.hasTable('recipe_image').then(async exists => {
    if (!exists) return;

    await knex.schema.dropTable('recipe_image');
  });
}

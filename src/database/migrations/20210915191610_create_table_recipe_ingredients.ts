import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('recipe_ingredients').then(exists => {
    if (exists) return;

    return knex.schema.createTable('recipe_ingredients', table => {
      table.increments('id').primary();

      table.string('name').notNullable();
      table.string('unit').notNullable();
      table.integer('amount').notNullable();

      table
        .integer('recipe_id')
        .unsigned()
        .references('id')
        .inTable('recipes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('recipe_ingredients');
}

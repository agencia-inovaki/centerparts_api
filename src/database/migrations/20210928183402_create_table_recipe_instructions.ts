import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('recipe_instructions').then(async exists => {
    if (exists) return;

    await knex.schema.createTable('recipe_instructions', table => {
      table.string('instruction_id').primary().unique();

      table.integer('step_number').notNullable();
      table.string('step').notNullable();

      table.string('recipe_id').notNullable();
      table
        .foreign('recipe_id')
        .references('recipe_id')
        .inTable('recipes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.hasTable('recipe_instructions').then(async exists => {
    if (!exists) return;

    await knex.schema.dropTable('recipe_instructions');
  });
}

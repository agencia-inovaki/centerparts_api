import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('profile_image').then(async exists => {
    if (exists) return;

    await knex.schema.createTable('profile_image', table => {
      table.string('image_id').primary().unique();

      table.string('key').notNullable();
      table.string('path').notNullable();

      table.string('user_id').notNullable();
      table
        .foreign('user_id')
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.hasTable('profile_image').then(async exists => {
    if (!exists) return;

    await knex.schema.dropTable('profile_image');
  });
}

import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('banner_images').then(async exists => {
    if (exists) return;

    await knex.schema.createTable('banner_images', table => {
      table.string('id').primary().unique();
      table.string('key').notNullable();
      table.string('path').notNullable();
      table.string('banner_id').notNullable();
      table
        .foreign('banner_id')
        .references('id')
        .inTable('banners')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.hasTable('banner_images').then(async exists => {
    if (!exists) return;

    await knex.schema.dropTable('banner_images');
  });
}

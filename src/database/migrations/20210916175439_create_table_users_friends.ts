import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('users_friends').then(async exists => {
    if (exists) return;

    await knex.schema.createTable('users_friends', table => {
      table.string('friendship_id').primary().unique();

      table.string('user_one_id').notNullable();
      table
        .foreign('user_one_id')
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.string('user_two_id').notNullable();
      table
        .foreign('user_two_id')
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.hasTable('users_friends').then(async exists => {
    if (!exists) return;

    await knex.schema.dropTable('users_friends');
  });
}

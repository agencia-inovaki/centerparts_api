import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('users_friends').then(exists => {
    if (exists) return;

    return knex.schema.createTable('users_friends', table => {
      table.increments('id').primary();

      table.string('user_id');
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.string('friend_id');
      table
        .foreign('friend_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users_friends');
}

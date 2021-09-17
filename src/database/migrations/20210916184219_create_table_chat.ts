import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('chat').then(exists => {
    if (exists) return;

    return knex.schema.createTable('chat', table => {
      table.increments('id').primary();

      table.integer('user_id').unsigned();

      table
        .foreign('user_id')
        .references('user_id')
        .inTable('users_friends')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.integer('friend_id').unsigned();

      table
        .foreign('friend_id')
        .references('friend_id')
        .inTable('users_friends')
        .onDelete('CASCADE');

      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('chat');
}

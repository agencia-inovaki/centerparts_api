import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('users_friends').then(exists => {
    if (exists) return;

    return knex.schema.createTable('users_friends', table => {
      table.increments('id').primary();

      table.integer('user_id').unsigned();
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.integer('friend_id').unsigned();
      table
        .foreign('friend_id')
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
  await knex.schema.dropTable('users_friends');
}

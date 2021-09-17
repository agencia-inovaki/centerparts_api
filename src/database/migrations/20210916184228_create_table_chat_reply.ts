import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('chat_reply').then(exists => {
    if (exists) return;

    return knex.schema.createTable('chat_reply', table => {
      table.increments('id').primary();

      table
        .integer('chat_id')
        .unsigned()
        .references('id')
        .inTable('chat')
        .onDelete('CASCADE');

      table.integer('user_id').notNullable();
      table.text('reply_message').notNullable();

      table.timestamp('time').defaultTo(knex.fn.now());
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('chat_reply');
}

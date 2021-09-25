import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('friend_requests').then(exists => {
    if (exists) return;

    return knex.schema.createTable('friend_requests', table => {
      table.increments('id').primary();

      table.string('sender_id').unsigned();
      table
        .foreign('sender_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.integer('receiver_id').unsigned();
      table
        .foreign('receiver_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('friend_requests');
}

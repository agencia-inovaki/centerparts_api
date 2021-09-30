import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('friend_requests').then(async exists => {
    if (exists) return;

    await knex.schema.createTable('friend_requests', table => {
      table.string('request_id').primary().unique();

      table.string('sender_id').notNullable();
      table
        .foreign('sender_id')
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.string('receiver_id').notNullable();
      table
        .foreign('receiver_id')
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.hasTable('friend_requests').then(async exists => {
    if (!exists) return;

    await knex.schema.dropTable('friend_requests');
  });
}

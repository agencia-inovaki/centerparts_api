import { type Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.hasTable('users').then(async exists => {
    if (exists) return

    await knex.schema.createTable('users', table => {
      table.string('id').primary().unique()
      table.string('email').unique().notNullable()
      table.string('password').notNullable()
    })
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.hasTable('users').then(async exists => {
    if (!exists) return

    await knex.schema.dropTable('users')
  })
}

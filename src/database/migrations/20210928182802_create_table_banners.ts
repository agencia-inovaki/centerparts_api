import { type Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.hasTable('banners').then(async exists => {
    if (exists) return

    await knex.schema.createTable('banners', table => {
      table.string('id').primary().unique()
      table.string('title').notNullable()
      table.integer('position').notNullable()
      table.string('redirect_url').notNullable()
      table.boolean('visible').notNullable()
      table.string('category').notNullable()
      table.string('supplier_id').nullable()
      table.string('created_at').defaultTo(new Date().toISOString())
    })
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.hasTable('banners').then(async exists => {
    if (!exists) return

    await knex.schema.dropTable('banners')
  })
}

import { type Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.hasTable('products').then(async exists => {
    if (exists) return

    await knex.schema.createTable('products', table => {
      table.string('id').primary().unique()
      table.string('product_id').notNullable()
      table.string('banner_id').notNullable()
      table
        .foreign('banner_id')
        .references('id')
        .inTable('banners')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.hasTable('products').then(async exists => {
    if (!exists) return

    await knex.schema.dropTable('products')
  })
}

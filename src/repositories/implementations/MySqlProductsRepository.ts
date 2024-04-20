import { knex } from '../../database/connection'
import { type Product } from '../../entities/Product'
import { type IProductsRepository } from '../IProductsRepository'

export class MySqlProductsRepository implements IProductsRepository {
  private readonly selectProduct: string[]

  constructor () {
    this.selectProduct = [
      'products.id',
      'products.product_id',
      'products.banner_id'
    ]
  }

  async getAll (bannerId: string): Promise<Product[]> {
    const productsList = await knex
      .select(this.selectProduct)
      .from('products')
      .where({ banner_id: bannerId })

    return productsList as Product[]
  }

  async getOne (id: string): Promise<Product | null> {
    const product = await knex
      .select(this.selectProduct)
      .from('products')
      .where({ id })
      .first()

    if (!product) return null
    return product
  }

  async create (
    product: Product
  ): Promise<Product> {
    const insertProduct = await knex
      .insert({
        id: product.id,
        product_id: product.product_id,
        banner_id: product.banner_id
      })
      .into('products')
      .returning('*')

    return insertProduct[0] as Product
  }

  async delete (id: string): Promise<void> {
    await knex.table('products').where({ id }).delete()
  }
}

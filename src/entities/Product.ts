import { uuid } from 'uuidv4'

export class Product {
  public readonly id!: string
  public product_id!: string
  public banner_id!: string

  constructor (props: Omit<Product, 'id'>, id?: string) {
    Object.assign(this, props)

    this.id = id || uuid()
  }
}

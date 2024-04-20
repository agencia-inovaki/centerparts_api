import { Product } from '../../../entities/Product'
import { type IProductsRepository } from '../../../repositories/IProductsRepository'
import { type ICreateProductRequestDTO } from './CreateProductDTO'

export class CreateProductUseCase {
  constructor (
    private readonly productsRepository: IProductsRepository
  ) {}

  async execute (data: ICreateProductRequestDTO) {
    Object.entries(data).forEach(data => {
      if (typeof data[1] === 'string' && !data[1].replace(/\s+/g, '')) { throw new Error('Os campos estão inválidos.') }
    })

    const product = new Product({
      product_id: data.productId,
      banner_id: data.bannerId
    })

    const createdProduct = await this.productsRepository.create(product)
    return createdProduct
  }
}

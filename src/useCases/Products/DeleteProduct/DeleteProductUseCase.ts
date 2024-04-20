import { type IProductsRepository } from '../../../repositories/IProductsRepository'
import { type IDeleteProductRequest } from './DeleteProductDTO'

export class DeleteProductUseCase {
  constructor (private readonly productRepository: IProductsRepository) {}

  async execute (data: IDeleteProductRequest) {
    if (!data.productId.replace(/\s+/g, '')) { throw new Error('Id do produto inválida.') }

    const product = await this.productRepository.getOne(data.productId)
    if (!product) throw new Error('Produto não encontrado.')

    await this.productRepository.delete(product.id)
  }
}

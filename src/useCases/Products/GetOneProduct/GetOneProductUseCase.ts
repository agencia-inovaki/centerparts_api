import { type IProductsRepository } from '../../../repositories/IProductsRepository'
import { type IGetOneProductRequest } from './GetOneProductDTO'

export class GetOneProductUseCase {
  constructor (private readonly productsRepository: IProductsRepository) {}

  async execute (data: IGetOneProductRequest) {
    if (!data.productId.replace(/\s+/g, '')) { throw new Error('Id do produto inválida.') }

    const product = await this.productsRepository.getOne(data.productId)
    if (!product) throw new Error('Produto não econtrado.')

    return product
  }
}

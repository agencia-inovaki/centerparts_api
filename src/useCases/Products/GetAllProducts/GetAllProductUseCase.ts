import { type IProductsRepository } from '../../../repositories/IProductsRepository'

export class GetAllProductsUseCase {
  constructor (private readonly productsRepository: IProductsRepository) {}

  async execute (bannerId: string) {
    if (!bannerId) throw new Error('Id do banner não fornecida.')

    const products = await this.productsRepository.getAll(bannerId)
    return products
  }
}

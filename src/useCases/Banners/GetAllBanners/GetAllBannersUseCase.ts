import { BannerCategory } from '../../../entities/Banner'
import { type IBannersRepository } from '../../../repositories/IBannersRepository'

export class GetAllBannersUseCase {
  constructor (private readonly bannersRepository: IBannersRepository) {}

  async execute (category: string) {
    if (!Object.values(BannerCategory).includes(category as BannerCategory)) throw new Error('Categoria inválida.')
    const banners = await this.bannersRepository.getAll(category as BannerCategory)
    return banners
  }
}

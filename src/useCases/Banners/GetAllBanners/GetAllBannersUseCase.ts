import { BannerCategory, type FullBanner } from '../../../entities/Banner'
import { type IBannersRepository } from '../../../repositories/IBannersRepository'

export class GetAllBannersUseCase {
  constructor (private readonly bannersRepository: IBannersRepository) {}

  async execute (category: string, supplierId: any) {
    if (!Object.values(BannerCategory).includes(category as BannerCategory)) throw new Error('Categoria inválida.')

    let banners: FullBanner[]

    if (typeof supplierId === 'string') {
      banners = await this.bannersRepository.getAll(category as BannerCategory, supplierId)
      return banners
    }

    banners = await this.bannersRepository.getAll(category as BannerCategory)
    return banners.sort((a, b) => a.position - b.position)
  }
}

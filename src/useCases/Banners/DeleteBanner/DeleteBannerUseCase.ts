import { type IBannersRepository } from '../../../repositories/IBannersRepository'
import { type IDeleteBannerRequest } from './DeleteBannerDTO'

export class DeleteBannerUseCase {
  constructor (private readonly bannersRepository: IBannersRepository) {}

  async execute (data: IDeleteBannerRequest) {
    if (!data.bannerId.replace(/\s+/g, '')) { throw new Error('Id do banner inválida.') }

    const banner = await this.bannersRepository.getOne(data.bannerId)
    if (!banner) throw new Error('Banner não encontrado.')

    await this.bannersRepository.delete(banner)
  }
}

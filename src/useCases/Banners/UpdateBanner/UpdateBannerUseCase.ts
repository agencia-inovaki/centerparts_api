import { UpdateBanner } from '../../../entities/Banner'
import { type IBannersRepository } from '../../../repositories/IBannersRepository'
import { type IUpdateBannerRequestDTO } from './UpdateBannerDTO'

export class UpdateBannerUseCase {
  constructor (
    private readonly bannersRepository: IBannersRepository
  ) {}

  async execute (data: IUpdateBannerRequestDTO) {
    Object.entries(data).forEach(data => {
      if (typeof data[1] === 'string' && !data[1].replace(/\s+/g, '')) { throw new Error('Os campos estão inválidos.') }

      if (typeof data[1] === 'number' && isNaN(data[1])) { throw new Error('Os campos estão inválidos.') }
    })

    const banner = new UpdateBanner({
      id: data.id,
      title: data.title,
      position: data.position,
      redirect_url: data.redirect_url,
      visible: data.visible
    })

    const updated = await this.bannersRepository.update(banner.id, banner)
    return updated
  }
}

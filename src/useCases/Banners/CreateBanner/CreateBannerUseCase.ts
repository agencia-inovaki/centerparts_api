import { Banner, BannerImage } from '../../../entities/Banner'
import { type IBannersRepository } from '../../../repositories/IBannersRepository'
import { type ICreateBannerRequestDTO } from './CreateBannerDTO'

export class CreateBannerUseCase {
  constructor (
    private readonly bannersRepository: IBannersRepository
  ) {}

  async execute (data: ICreateBannerRequestDTO) {
    Object.entries(data).forEach(data => {
      if (typeof data[1] === 'string' && !data[1].replace(/\s+/g, '')) { throw new Error('Os campos estão inválidos.') }

      if (typeof data[1] === 'number' && isNaN(data[1])) { throw new Error('Os campos estão inválidos.') }
    })

    Object.entries(data.imageData).forEach(data => {
      if (!data[1].replace(/\s+/g, '')) throw new Error('Imagem é inválida.')
    })

    const banner = new Banner({
      title: data.title,
      position: data.position,
      redirect_url: data.redirect_url,
      visible: data.visible
    })

    const bannerImage = new BannerImage({
      key: data.imageData.key,
      banner_id: banner.id
    })

    const createdBanner = await this.bannersRepository.create(banner, bannerImage)
    return createdBanner
  }
}

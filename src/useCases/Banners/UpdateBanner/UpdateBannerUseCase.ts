import { Banner, BannerImage, FullBanner } from '../../../entities/Banner'
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

    Object.entries(data.imageData).forEach(data => {
      if (!data[1].replace(/\s+/g, '')) throw new Error('Imagem é inválida.')
    })

    const banner = new Banner({
      title: data.title,
      position: data.position,
      redirect_url: data.redirect_url,
      visible: data.visible
    }, data.id)

    const bannerImage = new BannerImage({
      key: data.imageData.key,
      banner_id: banner.id
    })

    const fullBanner = new FullBanner({
      id: banner.id,
      title: banner.title,
      position: banner.position,
      redirect_url: banner.redirect_url,
      visible: banner.visible,
      imageData: bannerImage
    })

    await this.bannersRepository.update(banner.id, fullBanner)
  }
}

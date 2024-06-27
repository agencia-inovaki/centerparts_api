import { Banner, BannerCategory, BannerImage } from '../../../entities/Banner'
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

    if (!Object.values(BannerCategory).includes(data.category)) throw new Error('Categoria inválida.')

    const allBanners = await this.bannersRepository.getAll(
      data.category, data.supplier_id
    )

    const banner = new Banner({
      title: data.title,
      position: data.position,
      redirect_url: data.redirect_url,
      visible: data.visible,
      category: data.category,
      supplier_id: null
    })

    if (allBanners.some(b => b.position === banner.position)) {
      throw new Error('A posição do banner especificada já está em uso.')
    }

    if (banner.category === BannerCategory.BANNER_PRINCIPAL_DO_FORNECEDOR) {
      if (!data.supplier_id) throw new Error('Banner principal do fornecedor precisa da id do fornecedor.')

      banner.supplier_id = data.supplier_id
    }

    const bannerImage = new BannerImage({
      key: data.imageData.key,
      banner_id: banner.id
    })

    const createdBanner = await this.bannersRepository.create(banner, bannerImage)
    return createdBanner
  }
}

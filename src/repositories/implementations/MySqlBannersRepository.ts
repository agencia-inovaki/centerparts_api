import { knex } from '../../database/connection'
import { BannerCategory, type UpdateBanner, type Banner, type BannerImage, type FullBanner } from '../../entities/Banner'
import { type IBannersRepository } from '../IBannersRepository'

export class MySqlBannersRepository implements IBannersRepository {
  private readonly selectBanner: string[]

  constructor () {
    this.selectBanner = [
      'banners.id',
      'banners.title',
      'banners.position',
      'banners.redirect_url',
      'banners.visible',
      'banners.category',
      'banners.supplier_id',
      'banners.created_at',
      'banner_images.banner_id',
      'banner_images.path',
      'banner_images.key'
    ]
  }

  async getAll (category: BannerCategory): Promise<FullBanner[]> {
    const bannersList = await knex
      .select(this.selectBanner)
      .from('banners')
      .where('banners.category', category)
      .join('banner_images', 'banners.id', 'banner_images.banner_id')
      .options({ nestTables: true })

    return bannersList as FullBanner[]
  }

  async getOne (bannerId: string): Promise<FullBanner | null> {
    const banner = await knex
      .select(this.selectBanner)
      .from('banners')
      .join('banner_images', 'banners.id', 'banner_images.banner_id')
      .where('banners.id', bannerId)
      .options({ nestTables: true })
      .first()

    if (!banner) return null
    return banner
  }

  async create (
    banner: Banner,
    bannerImage: BannerImage
  ): Promise<any> {
    const insertedBanner = await knex
      .insert({
        id: banner.id,
        title: banner.title,
        position: banner.position,
        redirect_url: banner.redirect_url,
        visible: banner.visible,
        category: banner.category,
        supplier_id: banner.supplier_id,
        created_at: new Date().toISOString()
      })
      .into('banners')
      .returning('*')

    const insertedImage = await knex
      .insert({
        id: bannerImage.id,
        key: bannerImage.key,
        path: bannerImage.path,
        banner_id: bannerImage.banner_id
      })
      .into('banner_images')
      .returning('*')

    return { ...insertedBanner[0], imageData: insertedImage[0] }
  }

  async update (
    bannerId: string,
    data: UpdateBanner
  ): Promise<any> {
    const updatedBanner = await knex
      .table('banners')
      .where({ id: bannerId })
      .update({
        title: data.title,
        position: data.position,
        redirect_url: data.redirect_url,
        visible: data.visible
      })
      .returning('*')

    return { ...updatedBanner[0] }
  }

  async delete (banner: FullBanner): Promise<void> {
    await knex.table('banners').where({ id: banner.id }).delete()

    if (banner.category === BannerCategory.ORDENACAO_DE_FORNECEDORES) {
      await knex.table('banners').where({ supplier_id: banner.id }).delete()
    }
  }
}

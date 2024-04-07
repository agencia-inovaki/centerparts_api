import { knex } from '../../database/connection'
import { type Banner, type BannerImage, type FullBanner } from '../../entities/Banner'
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
      'banner_images.banner_id',
      'banner_images.path',
      'banner_images.key'
    ]
  }

  async getAll (): Promise<FullBanner[]> {
    const bannersList = await knex
      .select(this.selectBanner)
      .from('banners')
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
  ): Promise<FullBanner> {
    const insertedBanner = await knex
      .insert({
        id: banner.id,
        title: banner.title,
        position: banner.visible,
        redirect_url: banner.visible,
        visible: banner.visible
      })
      .into('banners')
      .returning('*')
      .first()

    const insertedImage = await knex
      .insert({
        id: bannerImage.id,
        key: bannerImage.key,
        path: bannerImage.path,
        banner_id: bannerImage.banner_id
      })
      .into('banner_images')
      .returning('*')
      .first()

    return { ...insertedBanner, imageData: insertedImage }
  }

  async update (
    bannerId: string,
    data: Partial<FullBanner>
  ): Promise<FullBanner> {
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
      .first()

    let insImage: Record<string, any> | null = null

    if (data.imageData) {
      await knex.table('banner_images').where({ banner_id: bannerId }).delete()
      const insertedImage = await knex
        .insert({
          id: data.imageData.id,
          key: data.imageData.key,
          path: data.imageData.path,
          banner_id: bannerId
        })
        .into('banner_images')
        .returning('*')
        .first()

      insImage = insertedImage
    }

    return { ...updatedBanner, imageData: insImage ?? updatedBanner.imageData }
  }

  async delete (bannerId: string): Promise<void> {
    await knex.table('banners').where({ id: bannerId }).delete()
  }
}

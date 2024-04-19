import { type UpdateBanner, type Banner, type BannerImage, type FullBanner, type BannerCategory } from '../entities/Banner'

export interface IBannersRepository {
  getAll: (category: BannerCategory) => Promise<FullBanner[]>
  getOne: (bannerId: string) => Promise<FullBanner | null>

  create: (
    banner: Banner,
    bannerImage: BannerImage
  ) => Promise<any>
  update: (bannerId: string, data: UpdateBanner) => Promise<any>
  delete: (banner: FullBanner) => Promise<void>
}

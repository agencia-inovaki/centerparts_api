import { type Banner, type BannerImage, type FullBanner } from '../entities/Banner'

export interface IBannersRepository {
  getAll: () => Promise<FullBanner[]>
  getOne: (bannerId: string) => Promise<FullBanner | null>

  create: (
    banner: Banner,
    bannerImage: BannerImage
  ) => Promise<any>
  update: (bannerId: string, data: Banner) => Promise<any>
  delete: (bannerId: string) => Promise<void>
}

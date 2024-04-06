import { Banner, BannerImage, FullBanner } from '../entities/Banner'

export interface IBannersRepository {
  getAll: () => Promise<FullBanner[]>
  getOne: (bannerId: string) => Promise<FullBanner | null>

  create: (
    banner: Banner,  
    bannerImage: Omit<BannerImage, 'banner_id'>
  ) => Promise<FullBanner>
  update: ( bannerId: string, data: Partial<FullBanner>) => Promise<FullBanner>
  delete: (bannerId: string) => Promise<void>
}

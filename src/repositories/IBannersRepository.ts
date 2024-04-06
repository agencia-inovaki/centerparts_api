import { Banner } from '../entities/Banner'

export interface IBannersRepository {
  getAll: () => Promise<Banner[]>
  getOne: (bannerId: string) => Promise<Banner | null>

  create: (banner: Banner) => Promise<Banner>
  update: (banner: Banner) => Promise<Banner>
  delete: (bannerId: string) => Promise<void>
}

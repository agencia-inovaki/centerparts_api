import { type Banner, type BannerImage } from './src/entities/Banner'
import { type User } from './src/entities/User'

declare global {
  namespace Express {
    interface Request {
      customData: Record<string, any>
    }
  }
}

declare module 'knex/types/tables' {
  interface Tables {
    users: User
    banners: Banner
    banner_images: BannerImage
  }
}

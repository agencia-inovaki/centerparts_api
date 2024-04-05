import { User } from './src/models/Users';
import { Banner, BannerImage } from './src/entities/Banner';

declare global {
  namespace Express {
    interface Request {
      customData: {};
    }
  }
}

declare module 'knex/types/tables' {
  interface Tables {
    users: User;
    banners: Banner;
    banner_images: BannerImage;
  }
}

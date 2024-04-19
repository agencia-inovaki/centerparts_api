import { type BannerCategory } from '../../../entities/Banner'

interface ImageData {
  key: string
}

export interface ICreateBannerRequestDTO {
  title: string
  position: number
  redirect_url: string
  visible: boolean
  category: BannerCategory
  supplier_id?: string
  imageData: ImageData
}

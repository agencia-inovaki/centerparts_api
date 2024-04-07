interface ImageData {
  key: string
}

export interface IUpdateBannerRequestDTO {
  id: string
  title: string
  position: number
  redirect_url: string
  visible: boolean
  imageData: ImageData
}

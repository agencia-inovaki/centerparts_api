interface ImageData {
  key: string
}

export interface ICreateBannerRequestDTO {
  title: string
  position: number
  redirect_url: string
  visible: boolean
  imageData: ImageData
}

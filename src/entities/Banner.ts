import { uuid } from 'uuidv4'

export enum BannerCategory {
  BANNER_PRINCIPAL = 'banner-principal',
  LOGOMARCA_HOME = 'logomarca-home',
  BANNER_MENU_LATERAL = 'banner-menu-lateral',
  ORDENACAO_DE_FORNECEDORES = 'ordenacao-de-fornecedores',
  BANNER_PRINCIPAL_DO_FORNECEDOR = 'banner-principal-do-fornecedor'
}

export class Banner {
  public readonly id: string
  public title!: string
  public position!: number
  public redirect_url!: string
  public visible!: boolean
  public category!: BannerCategory
  public supplier_id!: string | null

  constructor (props: Omit<Banner, 'id'>, id?: string) {
    Object.assign(this, props)

    id ? this.id = id : this.id = uuid()
  }
}

export class UpdateBanner {
  public readonly id!: string
  public title!: string
  public position!: number
  public redirect_url!: string
  public visible!: boolean

  constructor (props: UpdateBanner) {
    Object.assign(this, props)
  }
}

export class BannerImage {
  public readonly id: string
  public key!: string
  public path: string
  public banner_id!: string

  constructor (
    props: Omit<BannerImage, 'id' | 'path'>,
    id?: string
  ) {
    Object.assign(this, props)

    id ? this.id = id : this.id = uuid()
    this.path = `${process.env.APP_URL}/uploads/${this.key}`
  }
}

export class FullBanner {
  public readonly id!: string
  public title!: string
  public position!: number
  public redirect_url!: string
  public visible!: boolean
  public category!: BannerCategory
  public supplier_id!: string | null
  public imageData!: BannerImage

  constructor (props: FullBanner) {
    Object.assign(this, props)
  }
}

export class UpdateFullBanner {
  public readonly id!: string
  public title?: string
  public position?: number
  public redirect_url?: string
  public visible?: boolean
  public imageData?: BannerImage

  constructor (props: UpdateFullBanner) {
    Object.assign(this, props)
  }
}

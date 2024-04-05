import { uuid } from 'uuidv4'

export class Banner {
  public readonly id: string
  public title!: string
  public position!: number
  public redirect_url!: string
  public visible!: boolean

  constructor (props: Omit<Banner, 'id'>, id?: string) {
    Object.assign(this, props)

    id ? this.id = id : this.id = uuid()
  }
}

export class BannerImage {
  public readonly id: string
  public key!: string
  public path: string
  public banner_id!: string

  constructor (props: Omit<BannerImage, 'id' | 'path'>, id?: string) {
    Object.assign(this, props)

    id ? this.id = id : this.id = uuid()
    this.path = `${process.env.APP_URL}/uploads/${this.key}`
  }
}

import bcrypt from 'bcrypt'
import { uuid } from 'uuidv4'

export class User {
  public readonly id: string
  public email!: string
  public password!: string

  constructor (
    props: Omit<User, 'id'>,
    id?: string,
    hashPassword?: boolean
  ) {
    Object.assign(this, props)

    id ? this.id = id : this.id = uuid()
    hashPassword &&
      (
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
      )
  }
}

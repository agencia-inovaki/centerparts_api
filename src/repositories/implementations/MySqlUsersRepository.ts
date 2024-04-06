import { type User } from '../../entities/User'
import { type IUsersRepository } from '../IUsersRepository'
import { knex } from '../../database/connection'

// OBS: use entities to create the data to send
// instead of returning queries without formatting, if you don't know the right format
export class MySqlUsersRepository implements IUsersRepository {
  private readonly selectUser: string[]
  private readonly selectUserToAuth: string[]

  constructor () {
    this.selectUser = [
      'users.id',
      'users.email'
    ]

    this.selectUserToAuth = [
      'users.id',
      'users.email',
      'users.password'
    ]
  }

  async findById (userId: string): Promise<User | null> {
    const user = await knex
      .select(this.selectUser)
      .from('users')
      .where('users.id', userId)
      .first()

    if (!user) return null
    return user
  }

  async findByEmail (email: string): Promise<User | null> {
    const user = await knex
      .select(this.selectUser)
      .from('users')
      .where('users.email', email)
      .first()

    if (!user) return null
    return user
  }

  async findToAuth (email: string): Promise<User | null> {
    const user = await knex
      .select(this.selectUserToAuth)
      .from('users')
      .where('users.email', email)
      .first()

    if (!user) return null
    return user
  }

  async create (user: User): Promise<User> {
    const userCreated = await knex
      .insert(user)
      .into('users')
      .returning(['id', 'email', 'password'])

    return userCreated[0] as User
  }
}

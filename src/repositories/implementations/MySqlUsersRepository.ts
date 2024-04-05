import { type User } from '../../entities/User'
import { type IUsersRepository } from '../IUsersRepository'
import { knex } from '../../database/connection'

// OBS: use entities to create the data to send
// instead of returning queries without formatting, if you don't know the right format
export class MySqlUsersRepository implements IUsersRepository {
  private readonly selectPublicUser: string[]

  constructor () {
    this.selectPublicUser = [
      'users.id'
    ]
  }

  async findById (userId: string): Promise<User | null> {
    const query = await knex
      .select(this.selectPublicUser)
      .from('users')
      .leftJoin('profile_image', 'users.user_id', 'profile_image.user_id')
      .where('users.user_id', userId)
      .first()

    if (!query) return null
    return query
  }

  async findByEmail (email: string): Promise<User | null> {
    const query = await knex
      .select(this.selectPublicUser)
      .from('users')
      .leftJoin('profile_image', 'users.user_id', 'profile_image.user_id')
      .where('users.email', email)
      .first()

    if (!query) return null
    return query
  }

  async create (user: User): Promise<User> {
    const userCreated = await knex.insert(user).into('users').returning(['id', 'email', 'password'])
    return userCreated[0]
  }
}

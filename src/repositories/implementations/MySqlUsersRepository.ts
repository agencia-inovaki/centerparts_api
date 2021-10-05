import {
  CreateUserRequest,
  User,
  PublicUser,
  UpdateUserRequest,
  ProfileImage,
} from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';
import { knex } from '../../database/connection';

// OBS: use entities to create the data to send
// instead of returning queries without formatting, if you don't know the right format
export class MySqlUsersRepository implements IUsersRepository {
  private selectPublicUser: Array<string>;

  constructor() {
    this.selectPublicUser = [
      'users.user_id',
      'users.name',
      'users.username',
      'users.gender',
      'users.biography',
      'profile_image.path as image',
    ];
  }

  async findById(userId: string): Promise<PublicUser | null> {
    const query = await knex
      .select(this.selectPublicUser)
      .from('users')
      .leftJoin('profile_image', 'users.user_id', 'profile_image.user_id')
      .where('users.user_id', userId)
      .first();

    if (!query) return null;
    return query;
  }

  async findByEmail(email: string): Promise<PublicUser | null> {
    const query = await knex
      .select(this.selectPublicUser)
      .from('users')
      .leftJoin('profile_image', 'users.user_id', 'profile_image.user_id')
      .where('users.email', email)
      .first();

    if (!query) return null;
    return query;
  }

  async findByUsername(username: string): Promise<PublicUser | null> {
    const query = await knex
      .select(this.selectPublicUser)
      .from('users')
      .leftJoin('profile_image', 'users.user_id', 'profile_image.user_id')
      .where('users.username', username)
      .first();

    if (!query) return null;
    return query;
  }

  async findToAuthenticate(username: string): Promise<User | null> {
    const query = await knex
      .select('*')
      .from('users')
      .where({ username })
      .first();

    if (!query) return null;
    return query;
  }

  async findAll(): Promise<Array<PublicUser>> {
    const query = await knex
      .select(this.selectPublicUser)
      .from('users')
      .join('profile_image', 'users.user_id', 'profile_image.user_id');
    return query;
  }

  async create(
    user: CreateUserRequest,
    userPhoto: ProfileImage
  ): Promise<void> {
    await knex.insert(user).into('users');
    await knex.insert(userPhoto).into('profile_image');
  }

  async delete(userId: string): Promise<void> {
    await knex.table('users').where({ user_id: userId }).delete();
  }

  async update(userId: string, data: UpdateUserRequest): Promise<void> {
    await knex
      .table('users')
      .where({ user_id: userId })
      .update({ name: data.name, biography: data.biography });

    if (data.image) {
      await knex.table('profile_image').where({ user_id: userId }).delete();
      await knex.insert(data.image).into('profile_image');
    }
  }
}

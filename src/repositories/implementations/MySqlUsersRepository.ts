import {
  CreatedUser,
  User,
  PublicUser,
  UpdatedUser,
} from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';
import { knex } from '../../database/connection';

export class MySqlUsersRepository implements IUsersRepository {
  private selectPublicUser: Array<string>;

  constructor() {
    this.selectPublicUser = [
      'users.user_id',
      'users.name',
      'users.username',
      'users.gender',
      'users.biography',
    ];
  }

  async findById(userId: string): Promise<PublicUser | null> {
    const query = await knex
      .select(this.selectPublicUser)
      .from('users')
      .where({ user_id: userId })
      .first();

    if (!query) return null;

    return query;
  }

  async findByEmail(email: string): Promise<PublicUser | null> {
    const query = await knex
      .select(this.selectPublicUser)
      .from('users')
      .where({ email })
      .first();

    if (!query) return null;

    return query;
  }

  async findByUsername(username: string): Promise<PublicUser | null> {
    const query = await knex
      .select(this.selectPublicUser)
      .from('users')
      .where({ username })
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
    const query = await knex.select(this.selectPublicUser).from('users');

    return query;
  }

  async create(user: CreatedUser): Promise<void> {
    await knex.insert(user).into('users');
  }

  async delete(userId: string): Promise<void> {
    await knex.table('users').where({ user_id: userId }).delete();
  }

  async update(userId: string, data: UpdatedUser): Promise<void> {
    await knex
      .table('users')
      .where({ user_id: userId })
      .update({ ...data });
  }
}

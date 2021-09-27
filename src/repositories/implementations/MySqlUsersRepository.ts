import {
  CreatedUser,
  User,
  PublicUser,
  UpdatedUserFields,
} from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';
import { knex } from '../../database/connection';

export class MySqlUsersRepository implements IUsersRepository {
  private selectPublicUser: Array<string>;

  constructor() {
    this.selectPublicUser = [
      'users.id',
      'users.name',
      'users.username',
      'users.gender',
      'users.biography',
      'users.avatar_id',
      'users.friends_count',
    ];
  }

  async findById(userId: string): Promise<PublicUser | null> {
    const query = await knex
      .select(this.selectPublicUser)
      .from<User>('users')
      .where({ id: userId });

    if (query.length === 0) return null;

    return query[0] as PublicUser;
  }

  async findByEmail(email: string): Promise<PublicUser | null> {
    const query = await knex
      .select(this.selectPublicUser)
      .from<User>('users')
      .where({ email });

    if (query.length === 0) return null;

    return query[0] as PublicUser;
  }

  async findByUsername(username: string): Promise<PublicUser | null> {
    const query = await knex
      .select(this.selectPublicUser)
      .from<User>('users')
      .where({ username });

    if (query.length === 0) return null;

    return query[0] as PublicUser;
  }

  async findUserForAuth(username: string): Promise<User | null> {
    const query = await knex
      .select('*')
      .from<User>('users')
      .where({ username });

    if (query.length === 0) return null;

    return query[0] as User;
  }

  async findAll(): Promise<Array<PublicUser>> {
    const query = await knex.select(this.selectPublicUser).from<User>('users');

    return query as Array<PublicUser>;
  }

  async create(user: CreatedUser): Promise<void> {
    await knex.insert(user).into('users');
  }

  async delete(userId: string): Promise<void> {
    await knex.table<User>('users').where({ id: userId }).delete();
  }

  async update(userId: string, data: UpdatedUserFields): Promise<void> {
    await knex
      .table<User>('users')
      .where({ id: userId })
      .update({ ...data });
  }
}

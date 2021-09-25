import {
  CreatedUser,
  User,
  PublicUser,
  UpdatedUserFields,
} from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';
import { knex } from '../../database/connection';

export class MySqlUsersRepository implements IUsersRepository {
  async findAllFriends(userId: string): Promise<Array<PublicUser> | null> {
    const query = await knex('users_friends')
      .select([
        'friends.id as friend_id',
        'friends.name as friend_name',
        'friends.username as friend_username',
        'friends.gender as friend_gender',
        'friends.biography as friend_biography',
        'friends.avatar_id as friend_avatar_id',
        'friends.friends_count as friend_friends_count',
      ])
      .innerJoin({ friends: 'users' }, 'friends.id', 'users_friends.friend_id')
      .innerJoin({ users: 'users' }, 'users.id', 'users_friends.user_id')
      .where('users_friends.user_id', userId);

    if (!query) return null;

    return query;
  }

  async findFriend(
    userId: string,
    friendId: string
  ): Promise<PublicUser | null> {
    const query = await knex('users_friends')
      .select([
        'friends.id as friend_id',
        'friends.name as friend_name',
        'friends.username as friend_username',
        'friends.gender as friend_gender',
        'friends.biography as friend_biography',
        'friends.avatar_id as friend_avatar_id',
        'friends.friends_count as friend_friends_count',
      ])
      .innerJoin({ friends: 'users' }, 'friends.id', 'users_friends.friend_id')
      .innerJoin({ users: 'users' }, 'users.id', 'users_friends.user_id')
      .where('users_friends.friend_id', friendId)
      .andWhere('users_friends.user_id', userId)
      .first();

    if (!query) return null;

    return query;
  }

  async findById(userId: string): Promise<PublicUser | null> {
    const query = await knex<User>('users')
      .select([
        'users.id',
        'users.name',
        'users.username',
        'users.gender',
        'users.biography',
        'users.avatar_id',
        'users.friends_count',
      ])
      .where({ id: userId })
      .first();

    console.log(query);

    if (!query) return null;

    return query;
  }

  async findByEmail(email: string): Promise<PublicUser | null> {
    const query = await knex<User>('users')
      .select([
        'users.id',
        'users.name',
        'users.username',
        'users.gender',
        'users.biography',
        'users.avatar_id',
        'users.friends_count',
      ])
      .where({ email })
      .first();

    if (!query) return null;

    return query[0];
  }

  async findByUsername(username: string): Promise<PublicUser | null> {
    const query = await knex<User>('users')
      .select([
        'users.id',
        'users.name',
        'users.username',
        'users.gender',
        'users.biography',
        'users.avatar_id',
        'users.friends_count',
      ])
      .where({ username })
      .first();

    if (!query) return null;

    return query[0];
  }

  async findAll(): Promise<Array<PublicUser> | null> {
    const query = await knex<User>('users').select([
      'users.id',
      'users.name',
      'users.username',
      'users.gender',
      'users.biography',
      'users.avatar_id',
      'users.friends_count',
    ]);

    if (!query) return null;

    return query[0];
  }

  async create(user: CreatedUser): Promise<void> {
    await knex<User>('users').insert(user);
  }

  async delete(userId: string): Promise<void> {
    await knex<User>('users').where({ id: userId }).delete();
  }

  async update(userId: string, data: UpdatedUserFields): Promise<void> {
    await knex<User>('users')
      .where({ id: userId })
      .update({ ...data });
  }
}

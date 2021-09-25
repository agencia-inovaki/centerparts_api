import { FriendRequest } from '../../entities/FriendRequest';
import { PublicUser } from '../../entities/User';
import { IFriendsRepository } from '../IFriendsRepository';
import { knex } from '../../database/connection';

export class MySqlFriendsRepository implements IFriendsRepository {
  async findAllFriends(userId: string): Promise<Array<PublicUser>> {
    const query = await knex('users_friends')
      .select([
        'friends.id as friend_id',
        'friends.name as friend_name',
        'friends.username as friend_username',
        'friends.gender as friend_gender',
        'friends.avatar_id as friend_avatar_id',
        'friends.biography as friend_biography',
        'friends.uploaded_recipes_count as friend_recipes_count',
        'friends.friends_count as friend_friends_count',
      ])
      .innerJoin({ friends: 'users' }, 'friends.id', 'users_friends.friend_id')
      .innerJoin({ users: 'users' }, 'users.id', 'users_friends.user_id')
      .where('users_friends.user_id', userId);

    return query;
  }

  async findOneFriend(
    userId: string,
    friendUsername: string
  ): Promise<PublicUser> {
    const friendId = await knex('users')
      .select(['users.id'])
      .where({ username: friendUsername })
      .first();

    const query = await knex('users_friends')
      .select([
        'friends.id as friend_id',
        'friends.name as friend_name',
        'friends.username as friend_username',
        'friends.gender as friend_gender',
        'friends.avatar_id as friend_avatar_id',
        'friends.biography as friend_biography',
        'friends.uploaded_recipes_count as friend_recipes_count',
        'friends.friends_count as friend_friends_count',
      ])
      .innerJoin({ friends: 'users' }, 'friends.id', 'users_friends.friend_id')
      .innerJoin({ users: 'users' }, 'users.id', 'users_friends.user_id')
      .where('users_friends.friend_id', friendId[0].id)
      .andWhere('users_friends.user_id', userId)
      .first();

    return query[0];
  }

  async findAllFriendRequests(userId: string): Promise<Array<FriendRequest>> {
    const query = await knex('friend_requests')
      .select([
        'friend_requests.id as request_id',
        'sender.id as sender_id',
        'sender.username as sender_username',
        'receiver.id as receiver_id',
        'receiver.username as receiver_username',
      ])
      .innerJoin({ sender: 'users' }, 'sender.id', 'friend_requests.sender_id')
      .innerJoin(
        { receiver: 'users' },
        'receiver.id',
        'friend_requests.receiver_id'
      )
      .where('friend_requests.receiver_id', userId);

    return query;
  }

  async findOneFriendRequest(requestId: number): Promise<FriendRequest> {
    const query = await knex('friend_requests')
      .select([
        'friend_requests.id as request_id',
        'sender.id as sender_id',
        'sender.username as sender_username',
        'receiver.id as receiver_id',
        'receiver.username as receiver_username',
      ])
      .innerJoin({ sender: 'users' }, 'sender.id', 'friend_requests.sender_id')
      .innerJoin(
        { receiver: 'users' },
        'receiver.id',
        'friend_requests.receiver_id'
      )
      .where('friend_requests.id', requestId)
      .first();

    return query[0];
  }

  async sendFriendRequest(senderId: string, receiverId: string): Promise<void> {
    await knex('friend_requests').insert({
      sender_id: senderId,
      receiver_id: receiverId,
    });
  }

  async acceptFriendRequest(requestId: number): Promise<void> {
    const request = await this.findOneFriendRequest(requestId);

    await knex('users_friends').insert({
      user_id: request.receiver_id,
      friend_id: request.sender_id,
    });
  }

  async rejectFriendRequest(requestId: number): Promise<void> {
    await knex('friend_requests')
      .where('friend_requests.id', requestId)
      .delete();
  }

  async removeFriend(friendshipId: number): Promise<void> {
    await knex('users_friends').where({ id: friendshipId }).delete();
  }
}

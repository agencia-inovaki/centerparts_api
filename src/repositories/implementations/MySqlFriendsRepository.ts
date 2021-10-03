import { FriendRequest } from '../../entities/FriendRequest';
import { PublicUser } from '../../entities/User';
import { IFriendsRepository } from '../IFriendsRepository';
import { knex } from '../../database/connection';
import { Friendship } from '../../entities/Friendship';

export class MySqlFriendsRepository implements IFriendsRepository {
  private selectPublicUser: Array<string>;
  private selectPublicFriend: Array<string>;
  private selectFriendRequest: Array<string>;

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

    this.selectPublicFriend = [
      'friends.id',
      'friends.name',
      'friends.username',
      'friends.gender',
      'friends.biography',
      'friends.avatar_id',
      'friends.friends_count',
    ];

    this.selectFriendRequest = [
      'friend_requests.id as request_id',
      'sender.id as sender_id',
      'sender.username as sender_username',
      'receiver.id as receiver_id',
      'receiver.username as receiver_username',
    ];
  }

  async findAllFriends(userId: string): Promise<Array<PublicUser>> {
    const query1 = await knex
      .select(this.selectPublicFriend)
      .from('users_friends')
      .innerJoin({ friends: 'users' }, 'friends.id', 'users_friends.friend_id')
      .innerJoin({ users: 'users' }, 'users.id', 'users_friends.user_id')
      .where('users_friends.user_id', userId);

    const query2 = await knex
      .select(this.selectPublicUser)
      .from('users_friends')
      .innerJoin({ friends: 'users' }, 'friends.id', 'users_friends.friend_id')
      .innerJoin({ users: 'users' }, 'users.id', 'users_friends.user_id')
      .where('users_friends.friend_id', userId);

    return [...query1, ...query2] as Array<PublicUser>;
  }

  async findOneFriend(
    userId: string,
    friendUsername: string
  ): Promise<PublicUser | null> {
    const friendId = await knex
      .select(['users.id'])
      .from('users')
      .where({ username: friendUsername });

    if (friendId.length === 0) return null;

    const query = await knex
      .select(this.selectPublicFriend)
      .from('users_friends')
      .innerJoin({ friends: 'users' }, 'friends.id', 'users_friends.friend_id')
      .innerJoin({ users: 'users' }, 'users.id', 'users_friends.user_id')
      .where('users_friends.friend_id', friendId[0].id)
      .andWhere('users_friends.user_id', userId);

    return query[0] as PublicUser;
  }

  async findAllFriendRequests(userId: string): Promise<Array<FriendRequest>> {
    const query = await knex
      .select(this.selectFriendRequest)
      .from('friend_requests')
      .innerJoin({ sender: 'users' }, 'sender.id', 'friend_requests.sender_id')
      .innerJoin(
        { receiver: 'users' },
        'receiver.id',
        'friend_requests.receiver_id'
      )
      .where('friend_requests.receiver_id', userId);

    return query as Array<FriendRequest>;
  }

  async findOneFriendRequest(requestId: number): Promise<FriendRequest | null> {
    const query = await knex
      .select(this.selectFriendRequest)
      .from('friend_requests')
      .innerJoin({ sender: 'users' }, 'sender.id', 'friend_requests.sender_id')
      .innerJoin(
        { receiver: 'users' },
        'receiver.id',
        'friend_requests.receiver_id'
      )
      .where('friend_requests.id', requestId);

    if (query.length === 0) return null;

    return query[0] as FriendRequest;
  }

  async findFriendship(
    userId: string,
    friendId: string
  ): Promise<Friendship | null> {
    const query = await knex
      .select([
        'users_friends.id as friendship_id',
        'users_friends.user_id',
        'users_friends.friend_id',
      ])
      .from('users_friends')
      .where({ user_id: userId })
      .andWhere({ friend_id: friendId })
      .orWhere({ user_id: friendId })
      .andWhere({ friend_id: userId });

    if (query.length === 0) return null;

    return query[0] as Friendship;
  }

  async sendFriendRequest(senderId: string, receiverId: string): Promise<void> {
    await knex
      .insert({
        sender_id: senderId,
        receiver_id: receiverId,
      })
      .into('friend_requests');
  }

  async findFriendRequestByUsers(
    senderId: string,
    receiverId: string
  ): Promise<number | null> {
    const query = await knex
      .select(['friend_requests.id'])
      .from('friend_requests')
      .where({
        sender_id: senderId,
      })
      .andWhere({ receiver_id: receiverId })
      .orWhere({ sender_id: receiverId })
      .andWhere({ receiver_id: senderId });

    if (query.length === 0) return null;

    return query[0];
  }

  async acceptFriendRequest(request: FriendRequest): Promise<void> {
    await knex
      .insert({
        user_id: request.sender_id,
        friend_id: request.receiver_id,
      })
      .into('users_friends');

    await knex
      .table('friend_requests')
      .where({ request_id: request.request_id })
      .delete();
  }

  async rejectFriendRequest(requestId: number): Promise<void> {
    await knex
      .table('friend_requests')
      .where('friend_requests.id', requestId)
      .delete();
  }

  async removeFriend(friendshipId: number): Promise<void> {
    await knex.table('users_friends').where({ id: friendshipId }).delete();
  }
}

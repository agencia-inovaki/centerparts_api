import {
  CreateFriendRequest,
  CreateFriendship,
  FriendRequest,
} from '../../entities/FriendRequest';
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
      'users.user_id',
      'users.name',
      'users.username',
      'users.gender',
      'users.biography',
      'profile_image.path as image',
    ];

    this.selectPublicFriend = [
      'friends.user_id',
      'friends.name',
      'friends.username',
      'friends.gender',
      'friends.biography',
      'profile_image.path as image',
    ];

    this.selectFriendRequest = [
      'friend_requests.request_id',
      'sender.user_id as sender_id',
      'sender.username as sender_username',
      'receiver.user_id as receiver_id',
      'receiver.username as receiver_user_username',
    ];
  }

  async findAllFriends(userId: string): Promise<Array<PublicUser>> {
    const query1 = await knex
      .select(this.selectPublicFriend)
      .from('users_friends')
      .innerJoin(
        { friends: 'users' },
        'friends.user_id',
        'users_friends.user_two_id'
      )
      .innerJoin(
        { users: 'users' },
        'users.user_id',
        'users_friends.user_one_id'
      )
      .leftJoin('profile_image', 'users.user_id', 'profile_image.user_id')
      .where('users_friends.user_one_id', userId);

    const query2 = await knex
      .select(this.selectPublicUser)
      .from('users_friends')
      .innerJoin(
        { friends: 'users' },
        'friends.user_id',
        'users_friends.user_two_id'
      )
      .innerJoin(
        { users: 'users' },
        'users.user_id',
        'users_friends.user_one_id'
      )
      .leftJoin('profile_image', 'users.user_id', 'profile_image.user_id')
      .where('users_friends.user_two_id', userId);

    return [...query1, ...query2];
  }

  async findOneFriend(
    userId: string,
    friendUsername: string
  ): Promise<PublicUser | null> {
    const friendId = await knex
      .select(['users.user_id'])
      .from('users')
      .where({ username: friendUsername })
      .first();

    if (!friendId) return null;

    const query = await knex
      .select(this.selectPublicFriend)
      .from('users_friends')
      .innerJoin(
        { friends: 'users' },
        'friends.user_id',
        'users_friends.user_two_id'
      )
      .innerJoin(
        { users: 'users' },
        'users.user_id',
        'users_friends.user_one_id'
      )
      .leftJoin('profile_image', 'users.user_id', 'profile_image.user_id')
      .where('users_friends.user_two_id', friendId.user_id)
      .andWhere('users_friends.user_one_id', userId)
      .first();

    if (!query) return null;
    return query;
  }

  async findAllFriendRequests(userId: string): Promise<Array<FriendRequest>> {
    const query = await knex
      .select(this.selectFriendRequest)
      .from('friend_requests')
      .innerJoin(
        { sender: 'users' },
        'sender.user_id',
        'friend_requests.sender_id'
      )
      .innerJoin(
        { receiver: 'users' },
        'receiver.user_id',
        'friend_requests.receiver_id'
      )
      .where('friend_requests.receiver_id', userId);

    return query;
  }

  async findOneFriendRequest(requestId: string): Promise<FriendRequest | null> {
    const query = await knex
      .select(this.selectFriendRequest)
      .from('friend_requests')
      .innerJoin(
        { sender: 'users' },
        'sender.user_id',
        'friend_requests.sender_id'
      )
      .innerJoin(
        { receiver: 'users' },
        'receiver.user_id',
        'friend_requests.receiver_id'
      )
      .where('friend_requests.request_id', requestId)
      .first();

    if (!query) return null;
    return query;
  }

  async findFriendship(
    userId: string,
    friendId: string
  ): Promise<Friendship | null> {
    const query = await knex
      .select([
        'users_friends.friendship_id',
        'users_friends.user_one_id',
        'users_friends.user_two_id',
      ])
      .from('users_friends')
      .where({ user_one_id: userId })
      .andWhere({ user_two_id: friendId })
      .orWhere({ user_one_id: friendId })
      .andWhere({ user_two_id: userId })
      .first();

    if (!query) return null;
    return query;
  }

  async sendFriendRequest(request: CreateFriendRequest): Promise<void> {
    await knex.insert(request).into('friend_requests');
  }

  async findFriendRequestByUsers(
    senderId: string,
    receiverId: string
  ): Promise<number | null> {
    const query = await knex
      .select(['friend_requests.request_id'])
      .from('friend_requests')
      .where({
        sender_id: senderId,
      })
      .andWhere({ receiver_id: receiverId })
      .orWhere({ sender_id: receiverId })
      .andWhere({ receiver_id: senderId })
      .first();

    if (!query) return null;
    return query;
  }

  async acceptFriendRequest(
    request: FriendRequest,
    friendship: CreateFriendship
  ): Promise<void> {
    await knex.insert(friendship).into('users_friends');

    await knex
      .table('friend_requests')
      .where({ request_id: request.request_id })
      .delete();
  }

  async rejectFriendRequest(requestId: string): Promise<void> {
    await knex
      .table('friend_requests')
      .where('friend_requests.request_id', requestId)
      .delete();
  }

  async removeFriend(friendshipId: string): Promise<void> {
    await knex
      .table('users_friends')
      .where({ friendship_id: friendshipId })
      .delete();
  }
}

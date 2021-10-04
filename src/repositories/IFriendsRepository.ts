import { FriendRequest } from '../entities/FriendRequest';
import { Friendship } from '../entities/Friendship';
import { PublicUser } from '../entities/User';

export interface IFriendsRepository {
  findAllFriends(userId: string): Promise<Array<PublicUser>>;
  findOneFriend(
    userId: string,
    friendUsername: string
  ): Promise<PublicUser | null>;

  findAllFriendRequests(userId: string): Promise<Array<FriendRequest>>;
  findOneFriendRequest(requestId: number): Promise<FriendRequest | null>;

  sendFriendRequest(senderId: string, receiverId: string): Promise<void>;
  acceptFriendRequest(request: FriendRequest): Promise<void>;
  rejectFriendRequest(requestId: number): Promise<void>;

  findFriendship(userId: string, friendId: string): Promise<Friendship | null>;
  findFriendRequestByUsers(
    senderId: string,
    receiverId: string
  ): Promise<number | null>;
  removeFriend(friendshipId: string): Promise<void>;
}

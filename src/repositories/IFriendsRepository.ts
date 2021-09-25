import { FriendRequest } from '../entities/FriendRequest';
import { PublicUser } from '../entities/User';

export interface IFriendsRepository {
  findAllFriends(userId: string): Promise<Array<PublicUser>>;
  findOneFriend(userId: string, friendUsername: string): Promise<PublicUser>;

  findAllFriendRequests(userId: string): Promise<Array<FriendRequest>>;
  findOneFriendRequest(requestId: number): Promise<FriendRequest>;

  sendFriendRequest(senderId: string, receiverId: string): Promise<void>;
  acceptFriendRequest(requestId: number): Promise<void>;
  rejectFriendRequest(requestId: number): Promise<void>;
  removeFriend(friendshipId: number): Promise<void>;
}

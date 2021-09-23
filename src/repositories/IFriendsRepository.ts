import { FriendRequest } from '../entities/FriendRequest';
import { PublicUser } from '../models/User';

export interface IFriendsRepository {
  findAllFriends(userId: string): Promise<Array<PublicUser> | null>;
  findOneFriend(
    userId: string,
    friendUsername: string
  ): Promise<PublicUser | null>;

  sendFriendRequest(senderId: string, receiverId: string): Promise<void>;
  findAllFriendRequests(userId: string): Promise<Array<FriendRequest> | null>;

  acceptFriendRequest(requestId: number): Promise<void>;
  rejectFriendRequest(requestId: number): Promise<void>;
}

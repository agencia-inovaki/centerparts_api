import {
  CreateFriendRequest,
  CreateFriendship,
  FriendRequest,
} from '../entities/FriendRequest';
import { Friendship } from '../entities/Friendship';
import { PublicUser } from '../entities/User';

export interface IFriendsRepository {
  findAllFriends(userId: string): Promise<Array<PublicUser>>;
  findOneFriend(
    userId: string,
    friendUsername: string
  ): Promise<PublicUser | null>;

  findAllFriendRequests(userId: string): Promise<Array<FriendRequest>>;
  findOneFriendRequest(requestId: string): Promise<FriendRequest | null>;

  sendFriendRequest(request: CreateFriendRequest): Promise<void>;
  acceptFriendRequest(
    request: FriendRequest,
    friendship: CreateFriendship
  ): Promise<void>;
  rejectFriendRequest(requestId: string): Promise<void>;

  findFriendship(userId: string, friendId: string): Promise<Friendship | null>;
  findFriendRequestByUsers(
    senderId: string,
    receiverId: string
  ): Promise<number | null>;
  removeFriend(friendshipId: string): Promise<void>;
}

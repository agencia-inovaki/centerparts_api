import { IFriendsRepository } from '../../../repositories/IFriendsRepository';
import { IRejectFriendRequestDTO } from './RejectFriendDTO';

export class RejectFriendUseCase {
  constructor(private friendsRepository: IFriendsRepository) {}

  async execute(data: IRejectFriendRequestDTO) {
    if (!data.requestId.replace(/\s+/g, ''))
      throw new Error('Request id is invalid.');

    const requestExists = await this.friendsRepository.findOneFriendRequest(
      data.requestId
    );
    if (!requestExists) throw new Error('Cannot find friend request.');

    await this.friendsRepository.rejectFriendRequest(data.requestId);
  }
}

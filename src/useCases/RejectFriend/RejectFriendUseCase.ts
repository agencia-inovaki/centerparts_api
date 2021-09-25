import { IFriendsRepository } from '../../repositories/IFriendsRepository';
import { IRejectFriendRequestDTO } from './RejectFriendDTO';

export class RejectFriendUseCase {
  constructor(private friendsRepository: IFriendsRepository) {}

  async execute(data: IRejectFriendRequestDTO) {
    const { requestId } = data;
    if (isNaN(requestId)) throw new Error('Request id is invalid.');

    const requestExists = await this.friendsRepository.findFriendRequestById(
      requestId
    );
    if (!requestExists) throw new Error('Cannot find friend request.');

    await this.friendsRepository.rejectFriendRequest(requestId);
  }
}

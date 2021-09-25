import { IFriendsRepository } from '../../repositories/IFriendsRepository';
import { IAcceptFriendRequestDTO } from './AcceptFriendDTO';

export class AcceptFriendUseCase {
  constructor(private friendsRepository: IFriendsRepository) {}

  async execute(data: IAcceptFriendRequestDTO) {
    const { requestId } = data;
    if (isNaN(requestId)) throw new Error('Request id is invalid.');

    const requestExists = await this.friendsRepository.findFriendRequestById(
      requestId
    );
    if (!requestExists) throw new Error('Cannot find friend request.');

    await this.friendsRepository.acceptFriendRequest(requestId);
  }
}

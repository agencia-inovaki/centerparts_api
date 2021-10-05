import { CreateFriendship } from '../../../entities/FriendRequest';
import { IFriendsRepository } from '../../../repositories/IFriendsRepository';
import { IAcceptFriendRequestDTO } from './AcceptFriendDTO';

export class AcceptFriendUseCase {
  constructor(private friendsRepository: IFriendsRepository) {}

  async execute(data: IAcceptFriendRequestDTO) {
    const { requestId } = data;
    if (!requestId.replace(/\s+/g, ''))
      throw new Error('Request id is invalid.');

    const request = await this.friendsRepository.findOneFriendRequest(
      requestId
    );
    if (!request) throw new Error('Cannot find friend request.');

    const friendship = new CreateFriendship({
      user_one_id: request.receiver_id,
      user_two_id: request.sender_id,
    });

    await this.friendsRepository.acceptFriendRequest(request, friendship);
  }
}

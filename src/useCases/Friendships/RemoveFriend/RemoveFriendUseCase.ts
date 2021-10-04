import { IFriendsRepository } from '../../../repositories/IFriendsRepository';
import { IRemoveFriendRequestDTO } from './RemoveFriendDTO';

export class RemoveFriendUseCase {
  constructor(private friendsRepository: IFriendsRepository) {}

  async execute(data: IRemoveFriendRequestDTO) {
    Object.entries(data).map(data => {
      if (!data[1].replace(/\s+/g, '')) throw new Error('Fields are invalid.');
    });

    const friendship = await this.friendsRepository.findFriendship(
      data.userId,
      data.friendId
    );
    if (!friendship)
      throw new Error('Cannot find friendship with the current data.');

    await this.friendsRepository.removeFriend(friendship.friendship_id);
  }
}

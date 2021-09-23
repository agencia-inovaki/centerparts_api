import { IFriendsRepository } from '../../repositories/IFriendsRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IAddFriendRequestDTO } from './AddFriendDTO';

export class AddFriendUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private friendsRepository: IFriendsRepository
  ) {}

  async execute(data: IAddFriendRequestDTO) {
    Object.entries(data).map(data => {
      if (!data[1].replace(/\s+/g, '')) throw new Error('Fields are invalid.');
    });

    const { senderId, receiverId } = data;

    const sender = await this.usersRepository.findById(senderId);
    if (!sender) throw new Error('Cannot find sender user.');

    const receiver = await this.usersRepository.findById(receiverId);
    if (!receiver) throw new Error('Cannot find receiver user.');

    await this.friendsRepository.sendFriendRequest(senderId, receiverId);
  }
}

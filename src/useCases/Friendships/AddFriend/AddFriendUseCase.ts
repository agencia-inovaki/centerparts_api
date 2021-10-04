import { IFriendsRepository } from '../../../repositories/IFriendsRepository';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
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
    if (senderId === receiverId) throw new Error('Both ids are the same.');

    const sender = await this.usersRepository.findById(senderId);
    if (!sender) throw new Error('Cannot find sender user.');

    const receiver = await this.usersRepository.findById(receiverId);
    if (!receiver) throw new Error('Cannot find receiver user.');

    const requestAlreadyExists =
      await this.friendsRepository.findFriendRequestByUsers(
        senderId,
        receiverId
      );

    if (requestAlreadyExists)
      throw new Error('You already sent a request to this user.');

    const friendshipAlreadyExists = await this.friendsRepository.findFriendship(
      senderId,
      receiverId
    );
    if (friendshipAlreadyExists)
      throw new Error('Both users are already friends.');

    await this.friendsRepository.sendFriendRequest(senderId, receiverId);
  }
}

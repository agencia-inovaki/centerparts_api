import { IFriendsRepository } from '../../repositories/IFriendsRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IGetFriendsListRequestDTO } from './GetFriendsListDTO';

export class GetFriendsListUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private friendsRepository: IFriendsRepository
  ) {}

  async execute(data: IGetFriendsListRequestDTO) {
    const userId = data.userId.replace(/\s+/g, '');
    if (!userId) throw new Error('User id is invalid.');

    const userExists = await this.usersRepository.findById(userId);
    if (!userExists) throw new Error('Cannot find user by id.');

    const friendsList = await this.friendsRepository.findAllFriends(userId);
    return friendsList;
  }
}

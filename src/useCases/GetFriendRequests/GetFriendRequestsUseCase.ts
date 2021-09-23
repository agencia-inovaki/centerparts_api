import { IFriendsRepository } from '../../repositories/IFriendsRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IGetFriendRequestsReqDTO } from './GetFriendRequestsDTO';

export class GetFriendRequestsUseCase {
  constructor(
    private friendsRepository: IFriendsRepository,
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: IGetFriendRequestsReqDTO) {
    const userId = data.userId.replace(/\s+/g, '');
    if (!userId) throw new Error('User id is invalid.');

    const user = await this.usersRepository.findById(userId);
    if (!user) throw new Error('Cannot find user by id.');

    const requestsList = await this.friendsRepository.findAllFriendRequests(
      userId
    );

    return requestsList;
  }
}

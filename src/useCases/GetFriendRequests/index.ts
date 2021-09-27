import { MySqlFriendsRepository } from '../../repositories/implementations/MySqlFriendsRepository';
import { MySqlUsersRepository } from '../../repositories/implementations/MySqlUsersRepository';
import { GetFriendRequestsController } from './GetFriendRequestsController';
import { GetFriendRequestsUseCase } from './GetFriendRequestsUseCase';

const mysqlUsersRepository = new MySqlUsersRepository();
const mysqlFriendsRepository = new MySqlFriendsRepository();

const getFriendRequestsUseCase = new GetFriendRequestsUseCase(
  mysqlUsersRepository,
  mysqlFriendsRepository
);
const getFriendRequestsController = new GetFriendRequestsController(
  getFriendRequestsUseCase
);

export { getFriendRequestsController };

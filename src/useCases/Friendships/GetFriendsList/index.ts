import { MySqlFriendsRepository } from '../../../repositories/implementations/MySqlFriendsRepository';
import { MySqlUsersRepository } from '../../../repositories/implementations/MySqlUsersRepository';
import { GetFriendsListController } from './GetFriendsListController';
import { GetFriendsListUseCase } from './GetFriendsListUseCase';

const mysqlUsersRepository = new MySqlUsersRepository();
const mysqlFriendsRepository = new MySqlFriendsRepository();

const getFriendsListUseCase = new GetFriendsListUseCase(
  mysqlUsersRepository,
  mysqlFriendsRepository
);
const getFriendsListController = new GetFriendsListController(
  getFriendsListUseCase
);

export { getFriendsListController };

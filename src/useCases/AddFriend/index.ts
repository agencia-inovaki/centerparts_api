import { MySqlFriendsRepository } from '../../repositories/implementations/MySqlFriendsRepository';
import { MySqlUsersRepository } from '../../repositories/implementations/MySqlUsersRepository';
import { AddFriendUseCase } from '../../useCases/AddFriend/AddFriendUseCase';
import { AddFriendController } from './AddFriendController';

const mysqlUsersRepository = new MySqlUsersRepository();
const mysqlFriendsRepository = new MySqlFriendsRepository();

const addFriendUseCase = new AddFriendUseCase(
  mysqlUsersRepository,
  mysqlFriendsRepository
);
const addFriendController = new AddFriendController(addFriendUseCase);

export { addFriendController };

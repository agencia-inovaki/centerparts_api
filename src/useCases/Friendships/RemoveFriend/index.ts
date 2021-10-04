import { MySqlFriendsRepository } from '../../../repositories/implementations/MySqlFriendsRepository';
import { MySqlUsersRepository } from '../../../repositories/implementations/MySqlUsersRepository';
import { RemoveFriendController } from './RemoveFriendController';
import { RemoveFriendUseCase } from './RemoveFriendUseCase';

const mysqlUsersRepository = new MySqlUsersRepository();
const mysqlFriendsRepository = new MySqlFriendsRepository();

const removeFriendUseCase = new RemoveFriendUseCase(
  mysqlUsersRepository,
  mysqlFriendsRepository
);
const removeFriendController = new RemoveFriendController(removeFriendUseCase);

export { removeFriendController };

import { MySqlFriendsRepository } from '../../../repositories/implementations/MySqlFriendsRepository';
import { RemoveFriendController } from './RemoveFriendController';
import { RemoveFriendUseCase } from './RemoveFriendUseCase';

const mysqlFriendsRepository = new MySqlFriendsRepository();

const removeFriendUseCase = new RemoveFriendUseCase(mysqlFriendsRepository);
const removeFriendController = new RemoveFriendController(removeFriendUseCase);

export { removeFriendController };

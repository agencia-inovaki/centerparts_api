import { MySqlFriendsRepository } from '../../../repositories/implementations/MySqlFriendsRepository';
import { AcceptFriendController } from './AcceptFriendController';
import { AcceptFriendUseCase } from './AcceptFriendUseCase';

const mysqlFriendsRepository = new MySqlFriendsRepository();

const acceptFriendUseCase = new AcceptFriendUseCase(mysqlFriendsRepository);
const acceptFriendController = new AcceptFriendController(acceptFriendUseCase);

export { acceptFriendController };

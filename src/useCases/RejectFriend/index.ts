import { MySqlFriendsRepository } from '../../repositories/implementations/MySqlFriendsRepository';
import { RejectFriendController } from './RejectFriendController';
import { RejectFriendUseCase } from './RejectFriendUseCase';

const mysqlFriendsRepository = new MySqlFriendsRepository();

const rejectFriendUseCase = new RejectFriendUseCase(mysqlFriendsRepository);
const rejectFriendController = new RejectFriendController(rejectFriendUseCase);

export { rejectFriendController };

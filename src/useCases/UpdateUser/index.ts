import { MySqlUsersRepository } from '../../repositories/implementations/MySqlUsersRepository';
import { UpdateUserController } from './UpdateUserController';
import { UpdateUserUseCase } from './UpdateUserUseCase';

const mysqlUsersRepository = new MySqlUsersRepository();

const updateUserUseCase = new UpdateUserUseCase(mysqlUsersRepository);
const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserController };

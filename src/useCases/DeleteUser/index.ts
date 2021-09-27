import { MySqlUsersRepository } from '../../repositories/implementations/MySqlUsersRepository';
import { DeleteUserController } from './DeleteUserController';
import { DeleteUserUseCase } from './DeleteUserUseCase';

// implementations
const mysqlUsersRepository = new MySqlUsersRepository();

const deleteUserUseCase = new DeleteUserUseCase(mysqlUsersRepository);
const deleteUserController = new DeleteUserController(deleteUserUseCase);

export { deleteUserController };

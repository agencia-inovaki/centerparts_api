import { MySqlUsersRepository } from '../../../repositories/implementations/MySqlUsersRepository';
import { GetUserController } from './GetUserController';
import { GetUserUseCase } from './GetUserUseCase';

const mysqlUsersRepository = new MySqlUsersRepository();

const getUserUseCase = new GetUserUseCase(mysqlUsersRepository);
const getUserController = new GetUserController(getUserUseCase);

export { getUserController };

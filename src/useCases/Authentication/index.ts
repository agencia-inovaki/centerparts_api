import { MySqlUsersRepository } from '../../repositories/implementations/MySqlUsersRepository';
import { AuthenticationController } from './AuthenticationController';
import { AuthenticationUseCase } from './AuthenticationUseCase';

const mysqlUsersRepository = new MySqlUsersRepository();

const authenticationUseCase = new AuthenticationUseCase(mysqlUsersRepository);
const authenticationController = new AuthenticationController(
  authenticationUseCase
);

export { authenticationController };

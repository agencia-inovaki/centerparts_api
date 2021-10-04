import { MySqlRecipesRepository } from '../../../repositories/implementations/MySqlRecipesRepository';
import { MySqlUsersRepository } from '../../../repositories/implementations/MySqlUsersRepository';
import { GetAllUsersRecipesController } from './GetAllUsersRecipesController';
import { GetAllUsersRecipesUseCase } from './GetAllUsersRecipesUseCase';

const mysqlRecipesRepository = new MySqlRecipesRepository();
const mysqlUsersRepository = new MySqlUsersRepository();

const getAllUsersRecipesUseCase = new GetAllUsersRecipesUseCase(
  mysqlRecipesRepository,
  mysqlUsersRepository
);
const getAllUsersRecipesController = new GetAllUsersRecipesController(
  getAllUsersRecipesUseCase
);

export { getAllUsersRecipesController };

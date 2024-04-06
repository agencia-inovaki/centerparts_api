import { MySqlRecipesRepository } from '../../../repositories/implementations/MySqlRecipesRepository';
import { MySqlUsersRepository } from '../../../repositories/implementations/MySqlUsersRepository';
import { CreateRecipeController } from './CreateRecipeController';
import { CreateRecipeUseCase } from './CreateRecipeUseCase';

const mysqlRecipesRepository = new MySqlRecipesRepository();
const mysqlUsersRepository = new MySqlUsersRepository();

const createRecipeUseCase = new CreateRecipeUseCase(
  mysqlRecipesRepository,
  mysqlUsersRepository
);
const createRecipeController = new CreateRecipeController(createRecipeUseCase);

export { createRecipeController };

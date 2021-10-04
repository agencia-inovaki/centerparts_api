import { MySqlRecipesRepository } from '../../../repositories/implementations/MySqlRecipesRepository';
import { GetOneRecipeController } from './GetOneRecipeController';
import { GetOneRecipeUseCase } from './GetOneRecipeUseCase';

const mysqlRecipesRepository = new MySqlRecipesRepository();

const getOneRecipeUseCase = new GetOneRecipeUseCase(mysqlRecipesRepository);
const getOneRecipeController = new GetOneRecipeController(getOneRecipeUseCase);

export { getOneRecipeController };

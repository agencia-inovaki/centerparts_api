import { MySqlRecipesRepository } from '../../../repositories/implementations/MySqlRecipesRepository';
import { DeleteRecipeController } from './DeleteRecipeController';
import { DeleteRecipeUseCase } from './DeleteRecipeUseCase';

const mysqlRecipesRepository = new MySqlRecipesRepository();

const deleteRecipeUseCase = new DeleteRecipeUseCase(mysqlRecipesRepository);
const deleteRecipeController = new DeleteRecipeController(deleteRecipeUseCase);

export { deleteRecipeController };

import { MySqlRecipesRepository } from '../../../repositories/implementations/MySqlRecipesRepository';
import { GetAllRecipesController } from './GetAllRecipesController';
import { GetAllRecipesUseCase } from './GetAllRecipesUseCase';

const mysqlRecipesRepository = new MySqlRecipesRepository();

const getAllRecipesUseCase = new GetAllRecipesUseCase(mysqlRecipesRepository);
const getAllRecipesController = new GetAllRecipesController(
  getAllRecipesUseCase
);

export { getAllRecipesController };

import { IRecipesRepository } from '../../../repositories/IRecipesRepository';
import { IGetOneRecipeRequest } from './GetOneRecipeDTO';

export class GetOneRecipeUseCase {
  constructor(private recipesRepository: IRecipesRepository) {}

  async execute(data: IGetOneRecipeRequest) {
    if (!data.recipeId.replace(/\s+/g, ''))
      throw new Error('Recipe id is invalid.');

    const recipe = await this.recipesRepository.getOne(data.recipeId);
    if (!recipe) throw new Error('Cannot find recipe.');

    return recipe;
  }
}

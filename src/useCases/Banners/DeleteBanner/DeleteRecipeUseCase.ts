import { IRecipesRepository } from '../../../repositories/IRecipesRepository';
import { IDeleteRecipeRequest } from './DeleteRecipeDTO';

export class DeleteRecipeUseCase {
  constructor(private recipesRepository: IRecipesRepository) {}

  async execute(data: IDeleteRecipeRequest) {
    if (!data.recipeId.replace(/\s+/g, ''))
      throw new Error('Invalid recipe id');

    const recipe = await this.recipesRepository.getOne(data.recipeId);
    if (!recipe) throw new Error('Cannot find recipe');

    await this.recipesRepository.delete(data.recipeId);
  }
}

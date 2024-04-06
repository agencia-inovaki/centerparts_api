import { IRecipesRepository } from '../../../repositories/IRecipesRepository';

export class GetAllRecipesUseCase {
  constructor(private recipesRepository: IRecipesRepository) {}

  async execute() {
    const recipes = await this.recipesRepository.getAll();
    return recipes;
  }
}

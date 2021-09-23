import { Recipe } from '../entities/Recipe';

export interface IRecipesRepository {
  findOneById(recipeId: number): Promise<Recipe | null>;
  findAllByUserId(userId: string): Promise<Array<Recipe> | null>;
  findAll(): Promise<Array<Recipe> | null>;

  create(recipe: Recipe): Promise<void>;
  delete(recipeId: number): Promise<void>;
}

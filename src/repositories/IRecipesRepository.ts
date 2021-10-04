import { RecipeRequest } from '../entities/Recipe';

export interface IRecipesRepository {
  getAll(): Promise<Array<RecipeRequest>>;
  getAllByAuthor(authorId: string): Promise<Array<RecipeRequest>>;
  getOne(recipeId: string): Promise<RecipeRequest | null>;

  create(recipe: RecipeRequest): Promise<void>;
  delete(recipeId: string): Promise<void>;
}

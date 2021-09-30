import { CreateRecipeRequest } from '../entities/Recipe';

export interface IRecipesRepository {
  getAll(): Promise<Array<CreateRecipeRequest>>;
  getAllByAuthor(authorId: string): Promise<Array<CreateRecipeRequest>>;
  getOne(recipeId: string): Promise<CreateRecipeRequest | null>;

  create(recipe: CreateRecipeRequest): Promise<void>;
  delete(recipeId: string): Promise<void>;
}

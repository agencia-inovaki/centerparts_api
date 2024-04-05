import { Banner, BannerImage } from '../entities/Banner'

export interface IBannersRepository {
  getAll: () => Promise<RecipeRequest[]>
  getAllByAuthor: (authorId: string) => Promise<RecipeRequest[]>
  getOne: (recipeId: string) => Promise<RecipeRequest | null>

  create: (recipe: RecipeRequest) => Promise<void>
  delete: (recipeId: string) => Promise<void>
}

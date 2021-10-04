import { IRecipesRepository } from '../../../repositories/IRecipesRepository';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { IGetAllUsersRecipesRequest } from './GetAllUsersRecipesDTO';

export class GetAllUsersRecipesUseCase {
  constructor(
    private recipesRepository: IRecipesRepository,
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: IGetAllUsersRecipesRequest) {
    if (!data.userId.replace(/\s+/g, ''))
      throw new Error('User id is invalid.');

    const user = await this.usersRepository.findById(data.userId);
    if (!user) throw new Error('Cannot find user.');

    const recipes = await this.recipesRepository.getAllByAuthor(data.userId);
    return recipes;
  }
}

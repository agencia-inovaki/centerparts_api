import { Response, Request } from 'express';
import { GetAllUsersRecipesUseCase } from './GetAllUsersRecipesUseCase';

export class GetAllUsersRecipesController {
  constructor(private getAllUsersRecipesUseCase: GetAllUsersRecipesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.params.id;

    try {
      const recipes = await this.getAllUsersRecipesUseCase.execute({ userId });

      return response.status(200).json(recipes);
    } catch (error: Error | any) {
      return response
        .status(400)
        .json({ message: error.message || 'Unexpected error.' });
    }
  }
}

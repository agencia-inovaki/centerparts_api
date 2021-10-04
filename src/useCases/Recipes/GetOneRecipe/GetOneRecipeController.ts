import { Response, Request } from 'express';
import { GetOneRecipeUseCase } from './GetOneRecipeUseCase';

export class GetOneRecipeController {
  constructor(private getOneRecipeUseCase: GetOneRecipeUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const recipeId = request.params.id;

    try {
      const recipe = await this.getOneRecipeUseCase.execute({ recipeId });

      return response.status(200).json(recipe);
    } catch (error: Error | any) {
      return response
        .status(400)
        .json({ message: error.message || 'Unexpected error.' });
    }
  }
}

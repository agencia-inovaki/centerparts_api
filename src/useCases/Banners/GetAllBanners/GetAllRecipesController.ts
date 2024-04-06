import { Response, Request } from 'express';
import { GetAllRecipesUseCase } from './GetAllRecipesUseCase';

export class GetAllRecipesController {
  constructor(private getAllRecipesUseCase: GetAllRecipesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const recipes = await this.getAllRecipesUseCase.execute();

      return response.status(200).json(recipes);
    } catch (error: Error | any) {
      return response
        .status(400)
        .json({ message: error.message || 'Unexpected error.' });
    }
  }
}

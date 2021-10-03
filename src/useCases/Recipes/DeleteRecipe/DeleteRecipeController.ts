import { Response, Request } from 'express';
import { DeleteRecipeUseCase } from './DeleteRecipeUseCase';

export class DeleteRecipeController {
  constructor(private deleteRecipeUseCase: DeleteRecipeUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const recipeId = request.params.id;

    try {
      await this.deleteRecipeUseCase.execute({ recipeId });

      return response.status(200).send();
    } catch (error: Error | any) {
      return response
        .status(400)
        .json({ message: error.message || 'Unexpected error.' });
    }
  }
}

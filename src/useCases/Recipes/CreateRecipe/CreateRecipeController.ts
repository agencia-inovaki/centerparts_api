import { Response, Request } from 'express';
import { CreateRecipeUseCase } from './CreateRecipeUseCase';

export class CreateRecipeController {
  constructor(private createRecipeUseCase: CreateRecipeUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    if (!request.file) throw new Error('Cannot find recipe photo.');

    const key = request.file.originalname;
    const {
      title,
      servings,
      ready_in_minutes,
      ingredients,
      instructions,
      author_id,
    } = request.body;

    try {
      await this.createRecipeUseCase.execute({
        title,
        servings,
        ready_in_minutes,
        ingredients,
        instructions,
        image: { key: key },
        author_id,
      });

      return response.status(200).send();
    } catch (error: Error | any) {
      return response
        .status(400)
        .json({ message: error.message || 'Unexpected error.' });
    }
  }
}

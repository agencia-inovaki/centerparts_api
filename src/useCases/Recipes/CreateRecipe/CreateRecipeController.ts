import { Response, Request } from 'express';
import { Ingredients, Instructions } from './CreateRecipeDTO';
import { CreateRecipeUseCase } from './CreateRecipeUseCase';

export class CreateRecipeController {
  constructor(private createRecipeUseCase: CreateRecipeUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    if (!request.file) throw new Error('Cannot find recipe photo.');

    const { title, author_id } = request.body;
    const imageKey = request.file.filename;
    const servings = +request.body.servings;
    const ready_in_minutes = +request.body.ready_in_minutes;

    const ingredients: Array<any> = JSON.parse(request.body.ingredients);
    const instructions: Array<any> = JSON.parse(request.body.instructions);

    const newIngredients: Array<Ingredients> = ingredients.map(ingredient => {
      return {
        name: ingredient.name,
        unit: ingredient.unit,
        amount: +ingredient.amount,
      };
    });
    const newInstructions: Array<Instructions> = instructions.map(
      instruction => {
        return {
          step_number: instruction.step_number,
          step: instruction.step,
        };
      }
    );

    try {
      await this.createRecipeUseCase.execute({
        title,
        servings,
        ready_in_minutes,
        ingredients: newIngredients,
        instructions: newInstructions,
        image: { key: imageKey },
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

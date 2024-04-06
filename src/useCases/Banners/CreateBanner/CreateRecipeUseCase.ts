import {
  RecipeRequest,
  Recipe,
  RecipeImage,
  RecipeIngredients,
  RecipeInstructions,
} from '../../../entities/Recipe';
import { IRecipesRepository } from '../../../repositories/IRecipesRepository';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { ICreateRecipeRequestDTO } from './CreateRecipeDTO';

export class CreateRecipeUseCase {
  constructor(
    private recipesRepository: IRecipesRepository,
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateRecipeRequestDTO) {
    console.log(data);

    // data validation
    Object.entries(data).map(data => {
      if (typeof data[1] === 'string' && !data[1].replace(/\s+/g, ''))
        throw new Error('Recipe fields are invalid.');

      if (typeof data[1] === 'number' && isNaN(data[1]))
        throw new Error('Recipe fields are invalid.');
    });

    Object.entries(data.image).map(data => {
      if (!data[1].replace(/\s+/g, '')) throw new Error('Image is invalid.');
    });

    if (data.ingredients.length === 0)
      throw new Error('There must be one ingredient at least.');
    if (data.instructions.length === 0)
      throw new Error('There must be one instruction at least.');

    data.ingredients.map(ingredientData => {
      Object.entries(ingredientData).map(data => {
        if (typeof data[1] === 'string') {
          if (!data[1].replace(/\s+/g, ''))
            throw new Error('Format of name or unit is wrong.');
        }

        if (data[0] === 'amount') {
          if (isNaN(data[1])) throw new Error('Format of amount is wrong.');
        }
      });
    });

    data.instructions.map(instructionData => {
      Object.entries(instructionData).map(data => {
        if (data[0] === 'step') {
          if (!data[1].replace(/\s+/g, ''))
            throw new Error('Format of step is wrong.');
        }

        if (data[0] === 'step_number') {
          if (isNaN(data[1]))
            throw new Error('Format of step number is wrong.');
        }
      });
    });

    // check if recipe author exists
    const user = await this.usersRepository.findById(data.author_id);
    if (!user) throw new Error('Cannot find recipe author.');

    // create recipe
    const recipe = new Recipe({
      title: data.title,
      servings: data.servings,
      ready_in_minutes: data.ready_in_minutes,
      author_id: data.author_id,
    });

    const recipeIngredients = data.ingredients.map(ingredient => {
      return new RecipeIngredients({
        name: ingredient.name,
        unit: ingredient.unit,
        amount: ingredient.amount,
        recipe_id: recipe.recipe_id,
      });
    });

    const recipeInstructions = data.instructions.map(instruction => {
      return new RecipeInstructions({
        step_number: instruction.step_number,
        step: instruction.step,
        recipe_id: recipe.recipe_id,
      });
    });

    const recipeImage = new RecipeImage({
      key: data.image.key,
      recipe_id: recipe.recipe_id,
    });

    const recipeRequest = new RecipeRequest({
      ...recipe,
      ingredients: recipeIngredients,
      instructions: recipeInstructions,
      image: recipeImage,
    });

    // send to repository
    await this.recipesRepository.create(recipeRequest);
  }
}

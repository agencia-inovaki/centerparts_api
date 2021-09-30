import { knex } from '../../database/connection';
import { CreateRecipeRequest } from '../../entities/Recipe';
import { IRecipesRepository } from '../IRecipesRepository';

export class MySqlRecipesRepository implements IRecipesRepository {
  private selectRecipe: Array<string>;

  constructor() {
    this.selectRecipe = [
      'recipes.recipe_id',
      'recipes.title',
      'recipes.servings',
      'recipes.ready_in_minutes',
      'recipes.author_id',
      '',
    ];
  }

  async getAll(): Promise<Array<CreateRecipeRequest>> {
    await knex
      .select('*')
      .from('recipes')
      .innerJoin(
        'recipe_ingredients',
        'recipes.recipe_id',
        'recipe_ingredients.recipe_id'
      )
      .innerJoin(
        'recipe_instructions',
        'recipes.recipe_id',
        'recipe_instructions.recipe_id'
      )
      .innerJoin('recipe_image', 'recipes.recipe_id', 'recipe_image.recipe_id');
  }

  async create(recipe: CreateRecipeRequest): Promise<void> {
    await knex
      .insert({
        recipe_id: recipe.recipe_id,
        title: recipe.title,
        servings: recipe.servings,
        ready_in_minutes: recipe.ready_in_minutes,
        author_id: recipe.author_id,
      })
      .into('recipes');

    await knex
      .insert({
        image_id: recipe.image.image_id,
        key: recipe.image.key,
        path: recipe.image.path,
        recipe_id: recipe.image.recipe_id,
      })
      .into('recipe_image');

    recipe.ingredients.map(async ingredient => {
      await knex
        .insert({
          ingredient_id: ingredient.ingredient_id,
          name: ingredient.name,
          unit: ingredient.unit,
          amount: ingredient.amount,
          recipe_id: ingredient.recipe_id,
        })
        .into('recipe_ingredients');
    });

    recipe.instructions.map(async instruction => {
      await knex
        .insert({
          instruction_id: instruction.instruction_id,
          step_number: instruction.step_number,
          step: instruction.step,
          recipe_id: instruction.recipe_id,
        })
        .into('recipe_instructions');
    });
  }
}

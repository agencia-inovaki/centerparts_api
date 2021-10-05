import { knex } from '../../database/connection';
import { RecipeRequest } from '../../entities/Recipe';
import { IRecipesRepository } from '../IRecipesRepository';
import { formatRecipes } from '../../utils/formatRecipes';

export class MySqlRecipesRepository implements IRecipesRepository {
  private selectRecipe: Array<string>;

  constructor() {
    this.selectRecipe = [
      'recipes.recipe_id',
      'recipes.title',
      'recipes.servings',
      'recipes.ready_in_minutes',
      'recipes.author_id',
      'recipe_ingredients.recipe_id',
      'recipe_ingredients.name',
      'recipe_ingredients.unit',
      'recipe_ingredients.amount',
      'recipe_instructions.recipe_id',
      'recipe_instructions.step_number',
      'recipe_instructions.step',
      'recipe_image.recipe_id',
      'recipe_image.path',
      'recipe_image.key',
    ];
  }

  async getAll(): Promise<Array<any>> {
    const query = await knex
      .select(this.selectRecipe)
      .from('recipes')
      .join(
        'recipe_ingredients',
        'recipes.recipe_id',
        'recipe_ingredients.recipe_id'
      )
      .join(
        'recipe_instructions',
        'recipes.recipe_id',
        'recipe_instructions.recipe_id'
      )
      .join('recipe_image', 'recipes.recipe_id', 'recipe_image.recipe_id')
      .options({ nestTables: true });

    const response = formatRecipes(query);
    return response;
  }

  async getAllByAuthor(authorId: string): Promise<Array<any>> {
    const query = await knex
      .select(this.selectRecipe)
      .from('recipes')
      .join(
        'recipe_ingredients',
        'recipes.recipe_id',
        'recipe_ingredients.recipe_id'
      )
      .join(
        'recipe_instructions',
        'recipes.recipe_id',
        'recipe_instructions.recipe_id'
      )
      .join('recipe_image', 'recipes.recipe_id', 'recipe_image.recipe_id')
      .where('reicpes.author_id', authorId)
      .options({ nestTables: true });

    const response = formatRecipes(query);
    return response;
  }

  async getOne(recipeId: string): Promise<any | null> {
    const query = await knex
      .select(this.selectRecipe)
      .from('recipes')
      .join(
        'recipe_ingredients',
        'recipes.recipe_id',
        'recipe_ingredients.recipe_id'
      )
      .join(
        'recipe_instructions',
        'recipes.recipe_id',
        'recipe_instructions.recipe_id'
      )
      .join('recipe_image', 'recipes.recipe_id', 'recipe_image.recipe_id')
      .where('recipes.recipe_id', recipeId)
      .options({ nestTables: true });

    const response = formatRecipes(query);
    return response;
  }

  async create(recipe: RecipeRequest): Promise<void> {
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

  async delete(recipeId: string): Promise<void> {
    await knex.table('recipes').where({ recipe_id: recipeId }).delete();
  }
}

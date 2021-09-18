import { Request, Response, NextFunction } from 'express';
import { knex } from '../database/connection';
import { CreateRecipe } from '../models/Recipe';

export async function createRecipe(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body: CreateRecipe = req.body;

    Object.entries(body).map(value => {
      if (!value[1])
        throw new Error(
          'Fields cannot be empty! Please check them and try again.'
        );

      if (value[0].includes('ingredients') && value[1].length === 0)
        throw new Error('There must be one ingredient at least!');

      if (value[0].includes('instructions') && value[1].length === 0)
        throw new Error('There must be one instruction at least!');
    });

    body.ingredients.map(ing => {
      if (!ing.name || !ing.unit)
        throw new Error(
          'Fields cannot be empty! Please check them and try again.'
        );

      if (isNaN(ing.amount)) throw new Error('Amount must be a number! ');
    });

    body.instructions.map(ins => {
      if (!ins.step || !ins.stepNumber)
        throw new Error(
          'Fields cannot be empty and step number must be greater than 0! Please check them and try again.'
        );

      if (isNaN(ins.stepNumber))
        throw new Error('Step number must be a number!');
    });

    const createdRecipe = await knex.table('recipes').insert({
      title: body.title,
      image: body.image,
      servings_count: body.servingsCount,
      preparation_minutes: body.preparationMinutes,
      author_id: body.authorId,
    });

    body.ingredients.map(async ing => {
      await knex.table('recipe_ingredients').insert({
        name: ing.name,
        unit: ing.unit,
        amount: ing.amount,
        recipe_id: createdRecipe[0],
      });
    });

    body.instructions.map(async ins => {
      await knex.table('recipe_instructions').insert({
        step_number: ins.stepNumber,
        step: ins.step,
        recipe_id: createdRecipe[0],
      });
    });

    return res.status(200).json({ recipe_id: createdRecipe[0] });
  } catch (error: Error | any) {
    next(error.message);
  }
}

export async function deleteRecipe(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const recipeId: number = +req.params.id.replace(/\s+/g, '');

    if (!recipeId) throw new Error('Cannot find recipe id. Please try again.');

    const query = await knex.table('recipes').where({ id: recipeId }).delete();

    if (query) return res.status(200).json({ message: query });
  } catch (error: Error | any) {
    next(error.message);
  }
}

export async function getAllRecipes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (error) {}
}

export async function getRecipe(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (error) {}
}

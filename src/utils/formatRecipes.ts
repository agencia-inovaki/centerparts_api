import {
  IRecipesQuery,
  DataResponse,
  RecipeIngredients,
  RecipeInstructions,
  RecipeImage,
} from './IRecipesQuery';
import { isEqual } from 'lodash';

export function formatRecipes(query: Array<IRecipesQuery>) {
  const recipes: Array<DataResponse> = [];
  const recipeIngredients: Array<RecipeIngredients> = [];
  const recipeInstructions: Array<RecipeInstructions> = [];
  const recipeImages: Array<RecipeImage> = [];

  // organize data from query
  query.map(data => {
    // get recipes
    if (recipes.length === 0) {
      recipes.push(data.recipes);
    } else {
      const exists = recipes.some(recipe => isEqual(data.recipes, recipe));

      !exists && recipes.push(data.recipes);
    }

    // get recipe ingredients
    if (recipeIngredients.length === 0) {
      recipeIngredients.push(data.recipe_ingredients);
    } else {
      const exists = recipeIngredients.some(ingredient =>
        isEqual(data.recipe_ingredients, ingredient)
      );

      !exists && recipeIngredients.push(data.recipe_ingredients);
    }

    // get recipe instructions
    if (recipeInstructions.length === 0) {
      recipeInstructions.push(data.recipe_instructions);
    } else {
      const exists = recipeInstructions.some(instruction =>
        isEqual(data.recipe_instructions, instruction)
      );

      !exists && recipeInstructions.push(data.recipe_instructions);
    }

    // get recipe images
    if (recipeImages.length === 0) {
      recipeImages.push(data.recipe_image);
    } else {
      const exists = recipeImages.some(image =>
        isEqual(data.recipe_image, image)
      );

      !exists && recipeImages.push(data.recipe_image);
    }
  });

  // formatting data
  recipes.map(recipe => {
    recipe.ingredients = recipeIngredients
      .filter(ingredient => {
        if (ingredient.recipe_id === recipe.recipe_id) return ingredient;
      })
      .map(ingredient => {
        return {
          name: ingredient.name,
          unit: ingredient.unit,
          amount: ingredient.amount,
        };
      });

    recipe.instructions = recipeInstructions
      .filter(instruction => {
        if (instruction.recipe_id === recipe.recipe_id) return instruction;
      })
      .map(instruction => {
        return {
          step_number: instruction.step_number,
          step: instruction.step,
        };
      });

    const imageAsArr = recipeImages
      .filter(image => {
        if (image.recipe_id === recipe.recipe_id) return image;
      })
      .map(image => {
        return {
          url: image.path,
          key: image.key,
        };
      });

    recipe.image = imageAsArr[0];
  });

  return recipes;
}

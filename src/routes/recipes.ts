import express from 'express';
import multer from 'multer';
import { options } from '../config/multer';
import { auth } from '../middleware/auth';
import { createRecipeController } from '../useCases/Recipes/CreateRecipe';
import { deleteRecipeController } from '../useCases/Recipes/DeleteRecipe';
import { getAllRecipesController } from '../useCases/Recipes/GetAllRecipes';
import { getAllUsersRecipesController } from '../useCases/Recipes/GetAllUsersRecipes';
import { getOneRecipeController } from '../useCases/Recipes/GetOneRecipe';

export const recipeRouter = express.Router();

recipeRouter
  .post(
    '/recipe',
    auth,
    multer(options).single('recipe-photo'),
    (request, response) => {
      createRecipeController.handle(request, response);
    }
  )
  .delete('/recipe/:id', auth, (request, response) => {
    deleteRecipeController.handle(request, response);
  })
  .get('/recipes', auth, (request, response) => {
    getAllRecipesController.handle(request, response);
  })
  .get('/usersRecipes/:id', auth, (request, response) => {
    getAllUsersRecipesController.handle(request, response);
  })
  .get('/recipe/:id', auth, (request, response) => {
    getOneRecipeController.handle(request, response);
  });

import express from 'express';

export const router = express.Router();

import {
  createUser,
  deleteUser,
  getUsers,
  getUser,
} from './controllers/userController';

import { createRecipe, deleteRecipe } from './controllers/recipeController';

// user routes
router
  .post('/user', createUser)
  .delete('/user/:id', deleteUser)
  .get('/users', getUsers)
  .get('/user/:username', getUser);

// recipe routes
router.post('/recipe', createRecipe).delete('/recipe/:id', deleteRecipe);

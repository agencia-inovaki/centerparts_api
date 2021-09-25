import express from 'express';
import { createUserController } from './useCases/CreateUser';
import { deleteUserController } from './useCases/DeleteUser';

export const router = express.Router();

router
  .post('/user', (request, response) =>
    createUserController.handle(request, response)
  )
  .delete('/user/:id', (request, response) =>
    deleteUserController.handle(request, response)
  );

// .delete('/user/:id', deleteUser)
// .get('/users', getUsers)
// .get('/user/:username', getUser);

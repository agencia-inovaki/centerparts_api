import express from 'express';
import multer from 'multer';
import { options } from '../config/multer';
import { auth } from '../middleware/auth';
import { authenticationController } from '../useCases/Users/Authentication';
import { createUserController } from '../useCases/Users/CreateUser';
import { deleteUserController } from '../useCases/Users/DeleteUser';
import { getUserController } from '../useCases/Users/GetUser';
import { updateUserController } from '../useCases/Users/UpdateUser';

export const userRouter = express.Router();

userRouter
  .post('/authenticate', (request, response) =>
    authenticationController.handle(request, response)
  )
  .post('/user', multer(options).single('profile-photo'), (request, response) =>
    createUserController.handle(request, response)
  )
  .delete('/user/:id', auth, (request, response) =>
    deleteUserController.handle(request, response)
  )
  .put(
    '/user/:id',
    auth,
    multer(options).single('profile-photo'),
    (request, response) => updateUserController.handle(request, response)
  )
  .get('/user/:username', auth, (request, response) =>
    getUserController.handle(request, response)
  );

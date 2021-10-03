import express, { request, response } from 'express';
import multer from 'multer';
import { auth } from './middleware/auth';
import { acceptFriendController } from './useCases/AcceptFriend';
import { addFriendController } from './useCases/AddFriend';
import { authenticationController } from './useCases/Authentication';
import { createUserController } from './useCases/CreateUser';
import { deleteUserController } from './useCases/DeleteUser';
import { getFriendRequestsController } from './useCases/GetFriendRequests';
import { getFriendsListController } from './useCases/GetFriendsList';
import { getUserController } from './useCases/GetUser';
import { rejectFriendController } from './useCases/RejectFriend';
import { removeFriendController } from './useCases/RemoveFriend';
import { updateUserController } from './useCases/UpdateUser';
import { options } from './config/multer';
import { createRecipeController } from './useCases/Recipes/CreateRecipe';
import { MySqlRecipesRepository } from './repositories/implementations/MySqlRecipesRepository';

export const router = express.Router();

router
  .post('/user', (request, response) =>
    createUserController.handle(request, response)
  )
  .delete('/user/:id', auth, (request, response) =>
    deleteUserController.handle(request, response)
  )
  .put('/user/:id', auth, (request, response) =>
    updateUserController.handle(request, response)
  )
  .get('/user/:username', auth, (request, response) =>
    getUserController.handle(request, response)
  )
  .post('/friendRequest', auth, (request, response) =>
    addFriendController.handle(request, response)
  )
  .get('/friendRequests/:userId', auth, (request, response) =>
    getFriendRequestsController.handle(request, response)
  )
  .post('/acceptFriendRequest/:requestId', auth, (request, response) =>
    acceptFriendController.handle(request, response)
  )
  .post('/rejectFriendRequest/:requestId', auth, (request, response) =>
    rejectFriendController.handle(request, response)
  )
  .get('/friendsList/:userId', auth, (request, response) =>
    getFriendsListController.handle(request, response)
  )
  .delete('/friend/:id', auth, (request, response) =>
    removeFriendController.handle(request, response)
  )
  .get('/authenticate', (request, response) =>
    authenticationController.handle(request, response)
  )
  .post(
    '/recipe',
    multer(options).single('recipe-photo'),
    (request, response) => {
      createRecipeController.handle(request, response);
    }
  );

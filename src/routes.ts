import express, { request, response } from 'express';
import { acceptFriendController } from './useCases/AcceptFriend';
import { addFriendController } from './useCases/AddFriend';
import { createUserController } from './useCases/CreateUser';
import { deleteUserController } from './useCases/DeleteUser';
import { getFriendRequestsController } from './useCases/GetFriendRequests';
import { getFriendsListController } from './useCases/GetFriendsList';
import { getUserController } from './useCases/GetUser';
import { rejectFriendController } from './useCases/RejectFriend';
import { removeFriendController } from './useCases/RemoveFriend';
import { updateUserController } from './useCases/UpdateUser';

export const router = express.Router();

router
  .post('/user', (request, response) =>
    createUserController.handle(request, response)
  )
  .delete('/user/:id', (request, response) =>
    deleteUserController.handle(request, response)
  )
  .put('/user/:id', (request, response) =>
    updateUserController.handle(request, response)
  )
  .get('/user/:username', (request, response) =>
    getUserController.handle(request, response)
  )
  .post('/friendRequest', (request, response) =>
    addFriendController.handle(request, response)
  )
  .get('/friendRequests/:userId', (request, response) =>
    getFriendRequestsController.handle(request, response)
  )
  .post('/acceptFriendRequest/:requestId', (request, response) =>
    acceptFriendController.handle(request, response)
  )
  .post('/rejectFriendRequest/:requestId', (request, response) =>
    rejectFriendController.handle(request, response)
  )
  .get('/friendsList/:userId', (request, response) =>
    getFriendsListController.handle(request, response)
  )
  .delete('/friend/:id', (request, response) =>
    removeFriendController.handle(request, response)
  );

// .delete('/user/:id', deleteUser)
// .get('/users', getUsers)
// .get('/user/:username', getUser);

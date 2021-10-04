import express from 'express';
import { auth } from '../middleware/auth';
import { acceptFriendController } from '../useCases/Friendships/AcceptFriend';
import { addFriendController } from '../useCases/Friendships/AddFriend';
import { getFriendRequestsController } from '../useCases/Friendships/GetFriendRequests';
import { getFriendsListController } from '../useCases/Friendships/GetFriendsList';
import { rejectFriendController } from '../useCases/Friendships/RejectFriend';
import { removeFriendController } from '../useCases/Friendships/RemoveFriend';

export const friendshipRouter = express.Router();

friendshipRouter
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
  );

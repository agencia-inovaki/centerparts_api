import express from 'express'
// import { auth } from '../middleware/auth'
import { authenticationController } from '../useCases/Users/Authentication'
import { createUserController } from '../useCases/Users/CreateUser'
// import { getUserController } from '../useCases/Users/GetUser'

export const userRouter = express.Router()

userRouter
  .post('/authenticate', async (request, response) =>
    authenticationController.handle(request, response)
  )
  .post('/user', async (request, response) =>
    createUserController.handle(request, response)
  )
  // .get('/user/:email', auth, async (request, response) =>
  //   getUserController.handle(request, response)
  // )

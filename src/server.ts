import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { userRouter, recipeRouter, friendshipRouter } from './routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  '/uploads',
  express.static(path.join(__dirname, '..', 'tmp', 'uploads'))
);
app.use(userRouter, recipeRouter, friendshipRouter);

app.listen(process.env.PORT || 7070);

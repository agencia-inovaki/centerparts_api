import express from 'express';
import cors from 'cors';
import path from 'path';
import { router } from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  '/uploads',
  express.static(path.join(__dirname, '..', 'tmp', 'uploads'))
);
app.use(router);

app.listen(7070);

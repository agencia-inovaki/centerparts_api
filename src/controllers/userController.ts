import { Request, Response, NextFunction } from 'express';
import { knex } from '../database/connection';
import { CreateUser, User } from '../models/User';

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const query = await knex<User>('users').select([
      'users.id',
      'users.username',
      'users.name',
      'users.biography',
    ]);

    return res.status(200).json({ data: query });
  } catch (error) {
    next(error);
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const reqUsername: string = req.params.username.replace(/\s+/g, '');

    const query = await knex<User>('users')
      .select(['users.id', 'users.username', 'users.name', 'users.biography'])
      .where({ username: reqUsername });

    return res.status(200).json({ data: query });
  } catch (error) {
    next(error);
  }
}

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body: CreateUser = req.body;

    const { username, email, password, name, gender } = body;

    const newUser = {
      username,
      email,
      password,
      name,
      gender,
      avatar_id: Math.floor(Math.random() * (11 - 1) + 1),
    };

    const isUserFieldsEmpty = Object.values(newUser).some(
      value => value === ''
    );

    if (isUserFieldsEmpty)
      return res.status(401).json({ message: 'Fields cannot be empty!' });

    const query = await knex<User>('users').insert(newUser);

    if (query.length !== 0)
      return res
        .status(200)
        .json({ message: 'User created!', userId: query[0] });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId: number = +req.params.id.replace(/\s+/g, '');

    const query = await knex('users').where({ id: userId }).delete();

    if (query)
      return res.status(200).json({ message: 'User deleted!', info: query });
  } catch (error) {
    next(error);
  }
}

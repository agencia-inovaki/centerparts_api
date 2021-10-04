import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import { JWT_SECRET } from '../config/jwt';

export function auth(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ message: 'Where is the token???' });
  }

  const bearer = authToken.split(' ');
  const token = bearer[1];

  jwt.verify(token, JWT_SECRET, (error, data) => {
    if (error)
      return response
        .status(401)
        .json({ message: error.message || 'Invalid token.' });

    request.customData.token = token;
    request.customData.loggedUser = data;
    next();
  });
}

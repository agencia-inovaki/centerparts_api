import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import { JWT_SECRET } from '../config/jwt';

export function auth(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ message: 'Where is the token???' });
  }

  const token = authToken.split(' ')[1];

  jwt.verify(token, JWT_SECRET, function (error, decoded) {
    if (error) {
      return response
        .status(401)
        .json({ message: error.message || 'Invalid token.' });
    }

    request.customData = {
      token: token,
      data: decoded,
    };

    next();
  });
}

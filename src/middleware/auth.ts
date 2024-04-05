import jwt from 'jsonwebtoken'
import { type Response, type Request, type NextFunction } from 'express'
import { JWT_SECRET } from '../config/jwt'

export function auth (request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).json({ message: 'Token de autênticação não encontrado.' })
  }

  const token = authToken.split(' ')[1]

  jwt.verify(token, JWT_SECRET, function (error, decoded) {
    if (error) {
      return response
        .status(401)
        .json({ message: error.message || 'Token inválido.' })
    }

    // @ts-expect-error obs
    request.customData = {
      token,
      data: decoded
    }

    next()
  })
}

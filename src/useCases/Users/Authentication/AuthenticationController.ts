import { type Response, type Request } from 'express'
import { type AuthenticationUseCase } from './AuthenticationUseCase'

export class AuthenticationController {
  constructor (private readonly authenticationUseCase: AuthenticationUseCase) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    try {
      const userToken = await this.authenticationUseCase.execute({
        email,
        password
      })

      return response.status(200).json({ token: userToken })
    } catch (error: Error | any) {
      return response
        .status(422)
        .json({ message: error.message || 'Erro inesperado.' })
    }
  }
}

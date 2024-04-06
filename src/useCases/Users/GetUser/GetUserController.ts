import { type GetUserUseCase } from './GetUserUseCase'
import { type Request, type Response } from 'express'

export class GetUserController {
  constructor (private readonly getUserUseCase: GetUserUseCase) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const { email } = request.params

    try {
      const user = await this.getUserUseCase.execute({ email })

      return response.status(200).json(user)
    } catch (error: Error | any) {
      return response
        .status(400)
        .json({ message: error.message || 'Erro inesperado.' })
    }
  }
}

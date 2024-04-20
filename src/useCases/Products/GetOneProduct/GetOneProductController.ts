import { type Response, type Request } from 'express'
import { type GetOneProductUseCase } from './GetOneProductUseCase'

export class GetOneProductController {
  constructor (private readonly getOneProductUseCase: GetOneProductUseCase) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const productId = request.params.id

    try {
      const product = await this.getOneProductUseCase.execute({ productId })

      return response.status(200).json(product)
    } catch (error: Error | any) {
      return response
        .status(400)
        .json({ message: error.message || 'Erro inesperado.' })
    }
  }
}

import { type Response, type Request } from 'express'
import { type CreateProductUseCase } from './CreateProductUseCase'

export class CreateProductController {
  constructor (private readonly createProductUseCase: CreateProductUseCase) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const {
      productId,
      bannerId
    } = request.body

    try {
      const product = await this.createProductUseCase.execute({
        productId,
        bannerId
      })

      return response.status(200).json(product)
    } catch (error: Error | any) {
      return response
        .status(400)
        .json({ message: error.message || 'Erro inesperado.' })
    }
  }
}

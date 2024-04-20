import { type Response, type Request } from 'express'
import { type GetAllProductsUseCase } from './GetAllProductUseCase'

export class GetAllProductsController {
  constructor (private readonly getAllProductsUseCase: GetAllProductsUseCase) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const bannerId = request.params.bannerId
    try {
      const products = await this.getAllProductsUseCase.execute(bannerId)

      return response.status(200).json(products)
    } catch (error: Error | any) {
      return response
        .status(400)
        .json({ message: error.message || 'Erro inesperado.' })
    }
  }
}

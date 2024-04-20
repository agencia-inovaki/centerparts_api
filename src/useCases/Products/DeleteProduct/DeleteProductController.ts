import { type Response, type Request } from 'express'
import { type DeleteProductUseCase } from './DeleteProductUseCase'

export class DeleteProductController {
  constructor (private readonly deleteProductUseCase: DeleteProductUseCase) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const productId = request.params.id

    try {
      await this.deleteProductUseCase.execute({ productId })

      return response.status(200).send()
    } catch (error: Error | any) {
      return response
        .status(400)
        .json({ message: error.message || 'Erro inesperado.' })
    }
  }
}

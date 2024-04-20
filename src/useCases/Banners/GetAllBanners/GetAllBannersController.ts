import { type Response, type Request } from 'express'
import { type GetAllBannersUseCase } from './GetAllBannersUseCase'

export class GetAllBannersController {
  constructor (private readonly getAllBannersUseCase: GetAllBannersUseCase) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const category = request.params.category
    const supplierId = request.query.supplierId

    try {
      const banners = await this.getAllBannersUseCase.execute(category, supplierId)

      return response.status(200).json(banners)
    } catch (error: Error | any) {
      return response
        .status(400)
        .json({ message: error.message || 'Erro inesperado.' })
    }
  }
}

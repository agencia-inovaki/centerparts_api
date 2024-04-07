import { type Response, type Request } from 'express'
import { type DeleteBannerUseCase } from './DeleteBannerUseCase'

export class DeleteBannerController {
  constructor (private readonly deleteBannerUseCase: DeleteBannerUseCase) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const bannerId = request.params.id

    try {
      await this.deleteBannerUseCase.execute({ bannerId })

      return response.status(200).send()
    } catch (error: Error | any) {
      return response
        .status(400)
        .json({ message: error.message || 'Erro inesperado.' })
    }
  }
}

import { type Response, type Request } from 'express'
import { type UpdateBannerUseCase } from './UpdateBannerUseCase'

export class UpdateBannerController {
  constructor (private readonly createBannerUseCase: UpdateBannerUseCase) {}

  async handle (request: Request, response: Response): Promise<Response> {
    console.log('body', request.body)
    const { id, title, position, redirectUrl, visible } = request.body

    try {
      const banner = await this.createBannerUseCase.execute({
        id,
        title,
        position,
        redirect_url: redirectUrl,
        visible
      })

      return response.status(200).json(banner)
    } catch (error: Error | any) {
      return response
        .status(400)
        .json({ message: error.message || 'Erro inesperado.' })
    }
  }
}

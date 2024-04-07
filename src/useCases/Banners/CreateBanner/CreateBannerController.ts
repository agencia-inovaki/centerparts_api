import { type Response, type Request } from 'express'
import { type CreateBannerUseCase } from './CreateBannerUseCase'

export class CreateBannerController {
  constructor (private readonly createBannerUseCase: CreateBannerUseCase) {}

  async handle (request: Request, response: Response): Promise<Response> {
    if (!request.file) throw new Error('Imagem do banner não recebida.')

    const { title, position, redirectUrl, visible } = request.body
    const imageKey = request.file.filename

    try {
      const banner = await this.createBannerUseCase.execute({
        title,
        position,
        redirect_url: redirectUrl,
        visible,
        imageData: { key: imageKey }
      })

      return response.status(200).json(banner)
    } catch (error: Error | any) {
      return response
        .status(400)
        .json({ message: error.message || 'Erro inesperado.' })
    }
  }
}

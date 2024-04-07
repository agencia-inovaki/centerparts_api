import { type Response, type Request } from 'express'
import { type UpdateBannerUseCase } from './UpdateBannerUseCase'

export class UpdateBannerController {
  constructor (private readonly createBannerUseCase: UpdateBannerUseCase) {}

  async handle (request: Request, response: Response): Promise<Response> {
    if (!request.file) throw new Error('Imagem do banner não recebida.')

    const { id, title, position, redirectUrl, visible } = request.body
    const imageKey = request.file.filename

    try {
      await this.createBannerUseCase.execute({
        id,
        title,
        position,
        redirect_url: redirectUrl,
        visible,
        imageData: { key: imageKey }
      })

      return response.status(200).send()
    } catch (error: Error | any) {
      return response
        .status(400)
        .json({ message: error.message || 'Erro inesperado.' })
    }
  }
}

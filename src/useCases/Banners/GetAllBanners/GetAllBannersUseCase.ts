import { type IBannersRepository } from '../../../repositories/IBannersRepository'

export class GetAllBannersUseCase {
  constructor (private readonly bannersRepository: IBannersRepository) {}

  async execute () {
    const banners = await this.bannersRepository.getAll()
    return banners
  }
}

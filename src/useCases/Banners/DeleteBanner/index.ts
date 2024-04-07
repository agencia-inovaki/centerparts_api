import { MySqlBannersRepository } from '../../../repositories/implementations/MySqlBannersRepository'
import { DeleteBannerController } from './DeleteBannerController'
import { DeleteBannerUseCase } from './DeleteBannerUseCase'

const mysqlBannersRepository = new MySqlBannersRepository()

const deleteBannerUseCase = new DeleteBannerUseCase(mysqlBannersRepository)
const deleteBannerController = new DeleteBannerController(deleteBannerUseCase)

export { deleteBannerController }

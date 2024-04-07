import { MySqlBannersRepository } from '../../../repositories/implementations/MySqlBannersRepository'
import { UpdateBannerController } from './UpdateBannerController'
import { UpdateBannerUseCase } from './UpdateBannerUseCase'

const mysqlBannersRepository = new MySqlBannersRepository()

const updateRecipeUseCase = new UpdateBannerUseCase(
  mysqlBannersRepository
)
const updateBannerController = new UpdateBannerController(updateRecipeUseCase)

export { updateBannerController }

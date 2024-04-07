import { MySqlBannersRepository } from '../../../repositories/implementations/MySqlBannersRepository'
import { CreateBannerController } from './CreateBannerController'
import { CreateBannerUseCase } from './CreateBannerUseCase'

const mysqlBannersRepository = new MySqlBannersRepository()

const createRecipeUseCase = new CreateBannerUseCase(
  mysqlBannersRepository
)
const createBannerController = new CreateBannerController(createRecipeUseCase)

export { createBannerController }

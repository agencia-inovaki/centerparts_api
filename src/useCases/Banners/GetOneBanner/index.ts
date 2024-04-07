import { MySqlBannersRepository } from '../../../repositories/implementations/MySqlBannersRepository'
import { GetOneBannerController } from './GetOneRecipeController'
import { GetOneBannerUseCase } from './GetOneRecipeUseCase'

const mysqlBannersRepository = new MySqlBannersRepository()

const getOneBannerUseCase = new GetOneBannerUseCase(mysqlBannersRepository)
const getOneBannerController = new GetOneBannerController(getOneBannerUseCase)

export { getOneBannerController }

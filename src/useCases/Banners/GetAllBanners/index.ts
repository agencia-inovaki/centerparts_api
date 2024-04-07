import { MySqlBannersRepository } from '../../../repositories/implementations/MySqlBannersRepository'
import { GetAllBannersController } from './GetAllBannersController'
import { GetAllBannersUseCase } from './GetAllBannersUseCase'

const mysqlBannersRepository = new MySqlBannersRepository()

const getAllBannersUseCase = new GetAllBannersUseCase(mysqlBannersRepository)
const getAllBannersController = new GetAllBannersController(
  getAllBannersUseCase
)

export { getAllBannersController }

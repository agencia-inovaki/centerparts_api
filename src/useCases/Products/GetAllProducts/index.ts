import { MySqlProductsRepository } from '../../../repositories/implementations/MySqlProductsRepository'
import { GetAllProductsController } from './GetAllProductController'
import { GetAllProductsUseCase } from './GetAllProductUseCase'

const mysqlProductsRepository = new MySqlProductsRepository()

const getAllProductsUseCase = new GetAllProductsUseCase(mysqlProductsRepository)
const getAllProductsController = new GetAllProductsController(
  getAllProductsUseCase
)

export { getAllProductsController }

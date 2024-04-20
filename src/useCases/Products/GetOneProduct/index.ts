import { MySqlProductsRepository } from '../../../repositories/implementations/MySqlProductsRepository'
import { GetOneProductController } from './GetOneProductController'
import { GetOneProductUseCase } from './GetOneProductUseCase'

const mysqlProductsRepository = new MySqlProductsRepository()

const getOneProductUseCase = new GetOneProductUseCase(mysqlProductsRepository)
const getOneProductController = new GetOneProductController(getOneProductUseCase)

export { getOneProductController }

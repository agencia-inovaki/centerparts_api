import { MySqlProductsRepository } from '../../../repositories/implementations/MySqlProductsRepository'
import { CreateProductController } from './CreateProductController'
import { CreateProductUseCase } from './CreateProductUseCase'

const mysqlProductsRepository = new MySqlProductsRepository()

const createProductUseCase = new CreateProductUseCase(
  mysqlProductsRepository
)
const createProductController = new CreateProductController(createProductUseCase)

export { createProductController }

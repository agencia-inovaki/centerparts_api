import { MySqlProductsRepository } from '../../../repositories/implementations/MySqlProductsRepository'
import { DeleteProductController } from './DeleteProductController'
import { DeleteProductUseCase } from './DeleteProductUseCase'

const mysqlProductsRepository = new MySqlProductsRepository()

const deleteProductUseCase = new DeleteProductUseCase(mysqlProductsRepository)
const deleteProductController = new DeleteProductController(deleteProductUseCase)

export { deleteProductController }

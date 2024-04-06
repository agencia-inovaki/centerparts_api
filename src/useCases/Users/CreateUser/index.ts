import { MySqlUsersRepository } from '../../../repositories/implementations/MySqlUsersRepository'
import { CreateUserController } from './CreateUserController'
import { CreateUserUseCase } from './CreateUserUseCase'

// implementations
const mysqlUsersRepository = new MySqlUsersRepository()

const createUserUseCase = new CreateUserUseCase(mysqlUsersRepository)
const createUserController = new CreateUserController(createUserUseCase)

export { createUserController }

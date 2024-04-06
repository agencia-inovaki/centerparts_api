import { type IUsersRepository } from '../../../repositories/IUsersRepository'
import { type ICreateUserRequestDTO } from './CreateUserDTO'
import { User } from '../../../entities/User'

export class CreateUserUseCase {
  constructor (private readonly usersRepository: IUsersRepository) {}

  async execute (data: ICreateUserRequestDTO) {
    Object.entries(data).forEach(data => {
      if (typeof data[1] === 'string') {
        if (!data[1].replace(/\s+/g, '')) { throw new Error('Os campos estão inválidos.') }
      }
    })

    const userData = await this.usersRepository.findByEmail(
      data.email
    )
    if (userData) throw new Error('Email já existente.')

    const user = new User({
      email: data.email,
      password: data.password
    }, undefined, true)

    const createdUser = await this.usersRepository.create(user)
    return createdUser
  }
}

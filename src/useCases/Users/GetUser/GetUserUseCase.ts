import { type IUsersRepository } from '../../../repositories/IUsersRepository'
import { type IGetUserRequestDTO } from './GetUserDTO'

export class GetUserUseCase {
  constructor (private readonly usersRepository: IUsersRepository) {}

  async execute (data: IGetUserRequestDTO) {
    const email = data.email.replace(/\s+/g, '')
    if (!email) throw new Error('Email não válido.')

    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new Error('Usuário não encontrado.')

    return user
  }
}

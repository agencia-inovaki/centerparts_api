import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IUpdateUserRequestDTO } from './UpdateUserDTO';

export class UpdateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IUpdateUserRequestDTO) {}
}

import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { IDeleteUserRequestDTO } from './DeleteUserDTO';

export class DeleteUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IDeleteUserRequestDTO) {
    if (!data.id.replace(/\s+/g, '')) throw new Error('User id is invalid.');

    const user = await this.usersRepository.findById(data.id);
    if (!user) throw new Error('Cannot find user by id.');

    await this.usersRepository.delete(data.id);
  }
}

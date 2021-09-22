import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IDeleteUserRequestDTO } from './DeleteUserDTO';

export class DeleteUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IDeleteUserRequestDTO) {
    if (!data.id) throw new Error('Id cannot be blank.');

    const idExists = await this.usersRepository.findById(data.id);

    if (!idExists) throw new Error('Cannot find user id.');

    await this.usersRepository.delete(data.id);
  }
}

import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IUpdateUserRequestDTO } from './UpdateUserDTO';

export class UpdateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IUpdateUserRequestDTO) {
    const id = data.userId.replace(/\s+/g, '');
    if (!id) throw new Error('User id is invalid.');

    if (!data.name && !data.biography)
      throw new Error(
        'Name and biography are both blank. There must be one field filled at least.'
      );

    const user = await this.usersRepository.findById(id);
    if (!user) throw new Error('Cannot find user by id.');

    await this.usersRepository.update(id, {
      name: data.name ? data.name : user.name,
      biography: data.biography ? data.biography : user.biography,
    });
  }
}

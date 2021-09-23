import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IGetUserRequestDTO } from './GetUserDTO';

export class GetUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IGetUserRequestDTO) {
    const username = data.username.replace(/\s+/g, '');
    if (!username) throw new Error('Username is invalid.');

    const user = await this.usersRepository.findByUsername(username);
    if (!user) throw new Error('Cannot find user by username.');

    return user;
  }
}

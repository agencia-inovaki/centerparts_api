import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { User } from '../../entities/User';

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserRequestDTO) {
    Object.entries(data).map(data => {
      if (!data[1]) throw new Error('Fields cannot be blank.');
    });

    const emailAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );
    if (emailAlreadyExists) throw new Error('Email already exists.');

    const usernameAlreadyExists = await this.usersRepository.findByUsername(
      data.username
    );
    if (usernameAlreadyExists) throw new Error('Username already exists.');

    const user = new User(data);

    await this.usersRepository.create(user);
  }
}

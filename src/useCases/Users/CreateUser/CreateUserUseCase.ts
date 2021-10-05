import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { CreateUserRequest, ProfileImage } from '../../../entities/User';

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserRequestDTO) {
    Object.entries(data).map(data => {
      if (typeof data[1] === 'string') {
        if (!data[1].replace(/\s+/g, ''))
          throw new Error('Fields are invalid.');
      }

      if (typeof data[1] === 'number') {
        if (isNaN(data[1])) throw new Error('Fields are invalid.');
      }
    });

    const emailAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );
    if (emailAlreadyExists) throw new Error('Email already exists.');

    const usernameAlreadyExists = await this.usersRepository.findByUsername(
      data.username
    );
    if (usernameAlreadyExists) throw new Error('Username already exists.');

    const user = new CreateUserRequest({
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      gender: data.gender,
    });
    const userPhoto = new ProfileImage({
      key: data.imageKey,
      user_id: user.user_id,
    });

    await this.usersRepository.create(user, userPhoto);
  }
}

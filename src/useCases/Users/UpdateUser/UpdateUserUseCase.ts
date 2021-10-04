import { ProfileImage, UpdateUserRequest } from '../../../entities/User';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { IUpdateUserRequestDTO } from './UpdateUserDTO';

export class UpdateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IUpdateUserRequestDTO) {
    const id = data.userId.replace(/\s+/g, '');
    if (!id) throw new Error('User id is invalid.');

    if (!data.name && !data.biography && !data.imageKey)
      throw new Error(
        'All fields are blank. There must be one field filled at least.'
      );

    const user = await this.usersRepository.findById(id);
    if (!user) throw new Error('Cannot find user by id.');

    const profileImage = data.imageKey
      ? new ProfileImage({
          user_id: user.user_id,
          key: data.imageKey,
        })
      : null;

    const userData = new UpdateUserRequest({
      name: data.name ? data.name : user.name,
      biography: data.biography ? data.biography : user.biography,
      image: profileImage,
    });

    await this.usersRepository.update(id, userData);
  }
}

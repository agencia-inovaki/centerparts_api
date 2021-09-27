import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PublicUser } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IAuthenticationRequestDTO } from './AuthenticationDTO';
import { JWT_SECRET, JWT_EXPIRATION } from '../../config';

export class AuthenticationUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IAuthenticationRequestDTO) {
    Object.entries(data).map(data => {
      if (!data[1].replace(/\s+/g, '')) throw new Error('Fields are invalid.');
    });

    const { username, password } = data;

    const user = await this.usersRepository.findUserForAuth(username);
    if (!user) throw new Error('Username wrong. Please try again.');

    console.log(user);

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect)
      throw new Error('Password wrong. Please try again.');

    const userData = {
      id: user.id,
      name: user.name,
      username: user.username,
      gender: user.gender,
      biography: user.biography,
      avatar_id: user.avatar_id,
      friends_count: user.friends_count,
    };

    const token = jwt.sign(userData, JWT_SECRET, JWT_EXPIRATION);
    return token;
  }
}

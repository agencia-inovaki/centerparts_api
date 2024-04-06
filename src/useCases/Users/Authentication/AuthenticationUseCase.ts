import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { IAuthenticationRequestDTO } from './AuthenticationDTO';
import { JWT_SECRET, JWT_EXPIRATION } from '../../../config/jwt';

export class AuthenticationUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IAuthenticationRequestDTO) {
    Object.entries(data).map(data => {
      if (!data[1].replace(/\s+/g, '')) throw new Error('Os campos estão inválidos.');
    });

    const { email, password } = data;

    const user = await this.usersRepository.findToAuth(email);
    if (!user) throw new Error('Email errado. Por favor, tente novamente.');

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect)
      throw new Error('Senha errada. Por favor, tente novamente.');

    const userData = {
      id: user.id,
      email: user.email
    };

    const token = jwt.sign(userData, JWT_SECRET, JWT_EXPIRATION);
    return token;
  }
}

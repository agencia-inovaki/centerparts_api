import { User } from '../entities/User';

export interface IUsersRepository {
  findById(userId: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByUsername(username: string): Promise<User>;
  findAll(): Promise<Array<User>>;

  create(user: User): Promise<void>;
  delete(userId: string): Promise<void>;
  update(userId: string, data: User): Promise<void>;
}

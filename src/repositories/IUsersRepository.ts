import { CreatedUser, PublicUser, UpdatedUserFields } from '../entities/User';
import { User } from '../entities/User';

export interface IUsersRepository {
  findById(userId: string): Promise<PublicUser | null>;
  findByEmail(email: string): Promise<PublicUser | null>;
  findByUsername(username: string): Promise<PublicUser | null>;

  findUserForAuth(username: string): Promise<User | null>;

  create(user: CreatedUser): Promise<void>;
  delete(userId: string): Promise<void>;
  update(userId: string, data: UpdatedUserFields): Promise<void>;
}

import { CreatedUser, PublicUser, UpdatedUserFields } from '../entities/User';

export interface IUsersRepository {
  findById(userId: string): Promise<PublicUser | null>;
  findByEmail(email: string): Promise<PublicUser | null>;
  findByUsername(username: string): Promise<PublicUser | null>;

  create(user: CreatedUser): Promise<void>;
  delete(userId: string): Promise<void>;
  update(userId: string, data: UpdatedUserFields): Promise<void>;
}

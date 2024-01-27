import {
  CreateUserRequest,
  ProfileImage,
  PublicUser,
  UpdateUserRequest,
} from '../entities/User';
import { User } from '../entities/User';

export interface IUsersRepository {
  findAll(): Promise<Array<PublicUser>>;
  findById(userId: string): Promise<PublicUser | null>;
  findByEmail(email: string): Promise<PublicUser | null>;
  findByUsername(username: string): Promise<PublicUser | null>;
  findToAuthenticate(username: string): Promise<User | null>;

  create(user: CreateUserRequest): Promise<void>;
  delete(userId: string): Promise<void>;
  update(userId: string, data: UpdateUserRequest): Promise<void>;
}

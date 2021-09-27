import { uuid } from 'uuidv4';
import bcrypt from 'bcrypt';

export class CreatedUser {
  public readonly id: string;

  public name: string;
  public username: string;
  public email: string;
  public password: string;
  public gender: string;
  public avatar_id: number;

  constructor(props: Omit<CreatedUser, 'id' | 'avatar_id'>) {
    Object.assign(this, props);

    this.id = uuid();
    this.avatar_id = Math.floor(Math.random() * (11 - 1) + 1);
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  }
}

export class UpdatedUserFields {
  public name: string;
  public biography: string;

  constructor(props: UpdatedUserFields) {
    Object.assign(this, props);
  }
}

export class PublicUser {
  public readonly id: string;

  public name: string;
  public username: string;
  public gender: string;
  public biography: string;
  public avatar_id: number;
  public friends_count: number;

  constructor(props: PublicUser) {
    Object.assign(this, props);
  }
}

export class User {
  public readonly id: string;

  public name: string;
  public username: string;
  public email: string;
  public password: string;
  public gender: string;
  public biography: string;
  public avatar_id: number;
  public friends_count: number;

  public created_at: string;
  public updated_at: string;

  constructor(props: User) {
    Object.assign(this, props);
  }
}

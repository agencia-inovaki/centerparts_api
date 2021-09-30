import bcrypt from 'bcrypt';
import { uuid } from 'uuidv4';

export class User {
  public readonly user_id: string;

  public name: string;
  public username: string;
  public email: string;
  public password: string;
  public gender: number;
  public biography: string;

  public created_at: string;
  public updated_at: string;

  constructor(props: User) {
    Object.assign(this, props);
  }
}

export class PublicUser {
  public readonly user_id: string;

  public name: string;
  public username: string;
  public gender: string;
  public biography: string;

  constructor(props: PublicUser) {
    Object.assign(this, props);
  }
}

export class CreatedUser {
  public readonly user_id: string;

  public name: string;
  public username: string;
  public email: string;
  public password: string;
  public gender: number;

  constructor(props: Omit<CreatedUser, 'id'>) {
    Object.assign(this, props);

    this.user_id = uuid();
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  }
}

export class UpdatedUser {
  public name: string;
  public biography: string;

  constructor(props: UpdatedUser) {
    Object.assign(this, props);
  }
}

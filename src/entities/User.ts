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

export class ProfileImage {
  public readonly image_id: string;

  public key: string;
  public path: string;
  public user_id: string;

  constructor(props: Omit<ProfileImage, 'image_id' | 'path'>) {
    Object.assign(this, props);

    this.image_id = uuid();
    this.path = `${process.env.APP_URL}/uploads/${this.key}`;
  }
}

export class CreateUserRequest {
  public readonly user_id: string;

  public name: string;
  public username: string;
  public email: string;
  public password: string;
  public gender: number;

  constructor(props: Omit<CreateUserRequest, 'user_id'>) {
    Object.assign(this, props);

    this.user_id = uuid();
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  }
}

export class UpdateUserRequest {
  public name: string;
  public biography: string;
  public image: ProfileImage | null;

  constructor(props: UpdateUserRequest) {
    Object.assign(this, props);
  }
}

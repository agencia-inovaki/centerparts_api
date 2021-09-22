import { uuid } from 'uuidv4';

export class User {
  public readonly id: string;

  public username: string;
  public email: string;
  public password: string;
  public name: string;
  public gender: string;
  public avatar_id: number;

  constructor(
    props: Omit<User, 'id' | 'avatar_id'>,
    id?: string,
    createAvatarId?: boolean
  ) {
    Object.assign(this, props);

    if (!id) this.id = uuid();

    if (createAvatarId)
      this.avatar_id = Math.floor(Math.random() * (11 - 1) + 1);
  }
}

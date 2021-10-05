import { uuid } from 'uuidv4';

export class FriendRequest {
  public readonly request_id: string;

  public sender_id: string;
  public sender_username: string;
  public receiver_id: string;
  public receiver_username: string;

  constructor(props: FriendRequest) {
    Object.assign(this, props);
  }
}

export class CreateFriendship {
  public readonly friendship_id: string;

  public user_one_id: string;
  public user_two_id: string;

  constructor(props: Omit<CreateFriendship, 'friendship_id'>) {
    Object.assign(this, props);

    this.friendship_id = uuid();
  }
}

export class CreateFriendRequest {
  public readonly request_id: string;

  public sender_id: string;
  public receiver_id: string;

  constructor(props: Omit<CreateFriendRequest, 'request_id'>) {
    Object.assign(this, props);

    this.request_id = uuid();
  }
}

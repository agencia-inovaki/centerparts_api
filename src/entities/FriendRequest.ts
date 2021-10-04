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

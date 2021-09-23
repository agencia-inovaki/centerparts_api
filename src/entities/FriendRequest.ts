export class FriendRequest {
  public readonly id: number;

  public sender_id: string;
  public receiver_id: string;
  public is_accepted: number;

  constructor(props: FriendRequest) {
    Object.assign(this, props);
  }
}

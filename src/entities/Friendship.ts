export class Friendship {
  public readonly friendship_id: number;

  public user_id: string;
  public friend_id: string;

  constructor(props: Friendship) {
    Object.assign(this, props);
  }
}

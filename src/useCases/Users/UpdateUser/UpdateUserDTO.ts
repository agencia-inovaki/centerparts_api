export interface IUpdateUserRequestDTO {
  userId: string;
  name: string | null;
  biography: string | null;
  imageKey: string | null;
}

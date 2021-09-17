export interface CreateUser {
  username: string;
  email: string;
  password: string;
  name: string;
  gender: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  name: string;
  gender: string;
  avatar_id: number;
  biography: string;
  created_at: string;
  updated_at: string;
}

export interface PublicUser {
  id: number;
  username: string;
  name: string;
  biography: string;
  avatar_id: number;
  created_at: string;
  updated_at: string;
}

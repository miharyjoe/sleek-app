export interface CreateUserType {
  email: string;
  password: string;
  name: string;
  bio?: string;
  confirmPassword: string;
}

export interface LoginUserType {
  email: string;
  password: string;
}

export interface RestUserType {
  id: number;
  email: string;
  name: string;
}

export interface UserType {
  status: string;
  id: number;
  email: string;
  name: string;
  bio: string;
  updatedAt: string;
  createdAt: string;
  googleId?: string;
  deletedAt?: string;
  token: string;
}
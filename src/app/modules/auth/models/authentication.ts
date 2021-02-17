export enum UserLoginType {
  Username,
  Email
}

export interface UserLoginRequest {
  usernameOrEmail: string;
  password: string;
}

interface User {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserRegisterRequest extends User {
  role: string;
}

export interface UserResponse extends User {
  id: number;
  idRole: number;
}

export interface SuccessResponse {
  token: string;
}

export interface FailedResponse {
  errors: string[];
}

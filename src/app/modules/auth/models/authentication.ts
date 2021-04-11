import { RoleResponse } from '@modules/auth/models/role';
import { Permission } from '@modules/auth/models/permission';

export interface UserLoginRequest {
  usernameOrEmail: string;
  password: string;
}

interface User {
  identificationDocument: number;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserRegisterRequest extends User {
  role?: string;
}

export interface UserResponse extends User {
  id: string;
  roleId: string;
}

export interface UserWithRole extends UserResponse {
  role: RoleResponse;
}

export interface SuccessResponse {
  token: string;
  user: UserResponse;
  role: RoleResponse;
  permissions: Permission[];
}

export interface FailedResponse {
  errors: string[];
}

export interface UserAccount {
  user: UserResponse;
  role: RoleResponse;
}

export enum UserState {
  CREATED
}

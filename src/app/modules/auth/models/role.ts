import { Permission } from '@modules/auth/models/permission';

export enum DefaultRoles {
  ADMIN_USER = 'AdminUser',
  COMMON_USER = 'CommonUser'
}

export interface RoleRequest {
  name: string;
  displayName: string;
  permissionsIDs: number[];
}

export interface RoleResponse {
  id: number;
  name: string;
  displayName: string;
  permissions: Permission[];
}

export enum RoleState {
  CREATED
}

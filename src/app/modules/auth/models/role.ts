import { Permission } from '@modules/auth/models/permission';

export interface RoleRequest {
  name: string;
  permissionsIDs: number[];
}

export interface RoleResponse {
  id: number;
  name: string;
  displayName: string;
  permissions: Permission[];
}

export enum DefaultRoles {
  AdminUser = 'AdminUser',
  CommonUser = 'CommonUser'
}

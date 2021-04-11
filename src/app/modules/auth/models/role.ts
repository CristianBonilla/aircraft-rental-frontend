import { Permission } from '@modules/auth/models/permission';

export enum DefaultRoles {
  ADMIN_USER = 'AdminUser',
  COMMON_USER = 'CommonUser',
  PASSENGER_USER = 'PassengerUser',
  PILOT_USER = 'PilotUser'
}

export interface RoleRequest {
  name: string;
  displayName: string;
  permissionsIDs: number[];
}

export interface RoleResponse {
  id: string;
  name: string;
  displayName: string;
  permissions: Permission[];
}

export enum RoleState {
  CREATED
}

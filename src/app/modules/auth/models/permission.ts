export enum PermissionType {
  ROLES = 'ROLES',
  USERS = 'USERS',
  AIRCRAFTS = 'AIRCRAFTS',
  PASSENGERS = 'PASSENGERS',
  RENTALS = 'RENTALS'
}

export interface Permission {
  id: number;
  name: PermissionType;
}

export enum PermissionType {
  ROLES = 'CanRoles',
  USERS = 'CanUsers',
  RENTALS = 'CanRentals',
  AIRCRAFTS = 'CanAircrafts',
  PASSENGERS = 'CanPassengers'
}

export interface Permission {
  id: number;
  name: PermissionType;
}

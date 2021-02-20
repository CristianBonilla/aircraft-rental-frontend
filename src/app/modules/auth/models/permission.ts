export enum PermissionType {
  ROLES = 'CanRoles',
  USERS = 'CanUsers',
  AIRCRAFTS = 'CanAircrafts',
  PASSENGERS = 'CanPassengers',
  RENTALS = 'CanRentals'
}

export interface Permission {
  id: number;
  name: PermissionType;
}

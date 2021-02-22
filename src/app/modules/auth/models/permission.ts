import { DefaultRoles } from "@modules/auth/models/role";

const { AdminUser } = DefaultRoles;

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

export const ALLOW = {
  ROLES: [ AdminUser, PermissionType.ROLES ],
  USERS: [ AdminUser, PermissionType.USERS ],
  RENTALS: [ AdminUser, PermissionType.RENTALS ],
  AIRCRAFTS: [ AdminUser, PermissionType.AIRCRAFTS ],
  PASSENGERS: [ AdminUser, PermissionType.PASSENGERS ]
};

Object.freeze(ALLOW);

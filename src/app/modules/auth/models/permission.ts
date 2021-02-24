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

export const ALL_PERMISSIONS: (Permission & { displayName: string })[] = [
  { id: 1, name: PermissionType.ROLES, displayName: 'Roles' },
  { id: 2, name: PermissionType.USERS, displayName: 'Usuarios' },
  { id: 3, name: PermissionType.RENTALS, displayName: 'Alquileres' },
  { id: 4, name: PermissionType.AIRCRAFTS, displayName: 'Aeronaves' },
  { id: 5, name: PermissionType.PASSENGERS, displayName: 'Pasajeros' }
];

Object.freeze(ALL_PERMISSIONS);

export const ALLOW = {
  ROLES: [ AdminUser, PermissionType.ROLES ],
  USERS: [ AdminUser, PermissionType.USERS ],
  RENTALS: [ AdminUser, PermissionType.RENTALS ],
  AIRCRAFTS: [ AdminUser, PermissionType.AIRCRAFTS ],
  PASSENGERS: [ AdminUser, PermissionType.PASSENGERS ]
};

Object.freeze(ALLOW);

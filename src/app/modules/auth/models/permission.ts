import { DefaultRoles } from '@modules/auth/models/role';

const { ADMIN_USER: AdminUser } = DefaultRoles;

export enum PermissionType {
  ROLES = 'CanRoles',
  USERS = 'CanUsers',
  RENTALS = 'CanRentals',
  AIRCRAFTS = 'CanAircrafts',
  PASSENGERS = 'CanPassengers'
}

export interface Permission {
  id: string;
  order: number;
  name: PermissionType;
}

export interface PermissionDetail extends Permission {
  displayName: string;
}

export const ALL_PERMISSIONS: PermissionDetail[] = [
  { id: 'c5e3a53f-ce37-4512-91f3-a6d823dabe06', order: 1, name: PermissionType.ROLES, displayName: 'Roles' },
  { id: 'b8c5caa1-4a44-4783-af7e-eb29617a5a70', order: 2, name: PermissionType.USERS, displayName: 'Usuarios' },
  { id: '186df72b-0328-4539-8015-2965eb13ccec', order: 3, name: PermissionType.RENTALS, displayName: 'Alquileres' },
  { id: '44eb6612-536e-46d2-96ef-a752691f2296', order: 4, name: PermissionType.AIRCRAFTS, displayName: 'Aeronaves' },
  { id: '352dec26-951c-4236-afb5-b059f014e819', order: 5, name: PermissionType.PASSENGERS, displayName: 'Pasajeros' }
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

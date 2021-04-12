export enum AircraftRentalState {
  NotRented = 'NotRented',    // 78
  Rented = 'Rented'           // 82
}

interface Aircraft {
  name: string;
  state: AircraftRentalState;
  description: string;
}

export type AircraftRequest = Aircraft;

export interface AircraftResponse extends Aircraft {
  id: string;
}

export enum AircraftState {
  CREATED,
  UPDATED,
  DELETED
}

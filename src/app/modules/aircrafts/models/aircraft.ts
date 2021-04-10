export enum AircraftRentalState {
  NotRented = 'N',
  Rented = 'R'
}

interface Aircraft {
  name: string;
  state: AircraftRentalState;
  description: string;
}

export type AircraftRequest = Aircraft;

export interface AircraftResponse extends Aircraft {
  id: number;
}

export enum AircraftState {
  CREATED,
  UPDATED
}

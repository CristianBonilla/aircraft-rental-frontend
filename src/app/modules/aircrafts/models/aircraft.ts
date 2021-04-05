export enum AircraftState {
  NotRented = 'N',
  Rented = 'R'
}

interface Aircraft {
  name: string;
  state: AircraftState;
  description: string;
}

export type AircraftRequest = Aircraft;

export interface AircraftResponse extends Aircraft {
  id: number;
}

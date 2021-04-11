interface Rental {
  idPassenger: number;
  idAircraft: number;
  location: string;
  ArrivalDate: Date;
  departureDate: Date;
}

export type RentalRequest = Rental;

export interface RentalResponse extends Rental {
  id: string;
}

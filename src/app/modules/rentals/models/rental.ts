interface Rental {
  idPassenger: number;
  idAircraft: number;
  location: string;
  ArrivalDate: Date;
  departureDate: Date;
}

export interface RentalRequest extends Rental { }

export interface RentalResponse extends Rental {
  id: number;
}

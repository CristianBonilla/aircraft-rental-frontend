interface Rental {
  idPassenger: number;
  idAircraft: number;
  location: string;
  ArrivalDate: Date;
  departureDate;
}

export interface RentalRequest extends Rental { }

export interface RentalResponse extends Rental {
  id: number;
}
import { AircraftResponse } from '@modules/aircrafts/models/aircraft';

interface Rental {
  passengerId: string;
  aircraftId: string;
  location: string;
  arrivalDate: string;
  departureDate: string;
}

export type RentalRequest = Rental;

export interface RentalResponse extends Rental {
  id: string;
}

export interface RentalDisplay {
  passengersAmount: number;
  aircraft: AircraftResponse;
  location: string;
  arrivalDate: string;
  departureDate: string;
}

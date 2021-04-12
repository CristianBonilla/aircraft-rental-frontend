import { AircraftResponse } from '@modules/aircrafts/models/aircraft';

interface Rental {
  passengerId: string;
  aircraftId: string;
  location: string;
  departureDate: string;
  arrivalDate: string;
}

export type RentalRequest = Omit<Rental, 'passengerId'> & {
  passengerIDs: string[];
};

export interface RentalResponse extends Rental {
  id: string;
}

export interface RentalDisplay {
  passengersAmount: number;
  aircraft: AircraftResponse;
  location: string;
  departureDate: string;
  arrivalDate: string;
}

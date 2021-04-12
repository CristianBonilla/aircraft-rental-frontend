import { AircraftResponse } from '@modules/aircrafts/models/aircraft';
import { PassengerResponse } from '@modules/passengers/models/passenger';

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

export interface RentalDisplayDetail extends RentalDisplay {
  passengers: PassengerResponse[];
}

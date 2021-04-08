interface Passenger {
  identificationDocument: number;
  firstName: string;
  lastName: string;
  specialty: string;
}

export type PassengerRequest = Passenger;

export interface PassengerResponse extends Passenger {
  id: number;
}

export enum PassengerState {
  CREATED
}

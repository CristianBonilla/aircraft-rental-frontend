interface Passenger {
  identificationDocument: number;
  firstName: string;
  lastName: string;
  specialty: string;
}

export interface PassengerRequest extends Passenger { }

export interface PassengerResponse extends Passenger {
  id: number;
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PassengerRequest, PassengerResponse } from '@modules/passengers/models/passenger';
import { RentalRequest, RentalResponse } from '@modules/rentals/models/rental';
import { ENDPOINTS } from 'src/app/models/endpoints';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {
  private readonly httpHeaderOptions: HttpHeaders;
  private readonly rentalEndpointUrl = ENDPOINTS.RENTAL;
  private readonly passengersEndpointUrl = ENDPOINTS.PASSENGERS;

  constructor(private http: HttpClient) {
    this.httpHeaderOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  createRental(rentalRequest: RentalRequest) {
    const create$ = this.http.post<RentalResponse>(this.rentalEndpointUrl, rentalRequest, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return create$;
  }

  createPassenger(passengerRequest: PassengerRequest) {
    const create$ = this.http.post<PassengerResponse>(this.passengersEndpointUrl, passengerRequest, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return create$;
  }

  fetchRentalById(rentalId: string) {
    const rental$ = this.http.get<RentalResponse>(`${ this.rentalEndpointUrl }/${ rentalId }`, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return rental$;
  }

  fetchPassengerById(passengerId: string) {
    const passenger$ = this.http.get<PassengerResponse>(`${ this.passengersEndpointUrl }/${ passengerId }`, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return passenger$;
  }

  fetchRentals() {
    const rentals$ = this.http.get<RentalResponse[]>(this.rentalEndpointUrl, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return rentals$;
  }

  fetchPassengers() {
    const passengers$ = this.http.get<PassengerResponse[]>(this.passengersEndpointUrl, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return passengers$;
  }

  fetchPassengersNotAvailable() {
    const passengersNotAvailable$ = this.http.get<PassengerResponse[]>(
      `${ this.passengersEndpointUrl }/notavailable`, {
        responseType: 'json',
        ...this.httpHeaderOptions
      }
    );

    return passengersNotAvailable$;
  }
}

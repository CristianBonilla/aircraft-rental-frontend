import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AircraftRequest, AircraftResponse, AircraftRentalState } from '@modules/aircrafts/models/aircraft';
import { ENDPOINTS } from 'src/app/models/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AircraftsService {
  private readonly httpHeaderOptions: HttpHeaders;
  private readonly endpointUrl = ENDPOINTS.AIRCRAFT;

  constructor(private http: HttpClient) {
    this.httpHeaderOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  createAircraft(aircraftRequest: AircraftRequest) {
    const create$ = this.http.post<AircraftResponse>(this.endpointUrl, aircraftRequest, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return create$;
  }

  fetchAircrafts() {
    const aircrafts$ = this.http.get<AircraftResponse[]>(this.endpointUrl, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return aircrafts$;
  }

  fetchAircraftById(aircraftId: string) {
    const aircraft$ = this.http.get<AircraftResponse>(`${ this.endpointUrl }/${ aircraftId }`, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return aircraft$;
  }

  fetchAircraftsByState(aircraftState: AircraftRentalState | number) {
    const aircrafts$ = this.http.get<AircraftResponse[]>(`${ this.endpointUrl }/state/${ aircraftState }`, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return aircrafts$;
  }

  updateAircraft(aircraftId: string, aircraft: AircraftRequest) {
    const update$ = this.http.put<AircraftResponse>(`${ this.endpointUrl }/${ aircraftId }`, aircraft, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return update$;
  }

  deleteAircraft(aircraftId: string) {
    const delete$ = this.http.delete<void>(`${ this.endpointUrl }/${ aircraftId }`, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return delete$;
  }
}

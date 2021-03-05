import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AircraftRequest, AircraftResponse, AircraftState } from '@modules/aircrafts/models/aircraft';
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

  fetchAircraftById(aircraftId: number) {
    const aircraft$ = this.http.get<AircraftResponse>(`${ this.endpointUrl }/${ aircraftId }`, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return aircraft$;
  }

  fetchAircraftsByState(aircraftState: AircraftState) {
    const aircrafts$ = this.http.get<AircraftResponse[]>(`${ this.endpointUrl }/state/${ aircraftState }`, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return aircrafts$;
  }

  updateAircraft(aircraftId: number, aircraft: AircraftRequest) {
    const update$ = this.http.put<AircraftResponse>(`${ this.endpointUrl }/${ aircraftId }`, aircraft, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return update$;
  }

  deleteAircraft(aircraftId: number) {
    const delete$ = this.http.delete<void>(`${ this.endpointUrl }/${ aircraftId }`, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return delete$;
  }
}

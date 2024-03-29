import { Component, Inject, OnInit } from '@angular/core';
import { RefreshAircrafts, REFRESH_AIRCRAFTS } from '@core/providers/refresh.provider';
import { AircraftRentalState, AircraftResponse } from '@modules/aircrafts/models/aircraft';
import { DEFAULT_SCROLLBAR_OPTIONS, ScrollbarOptions } from 'src/app/models/scrollbar';
import { Observable } from 'rxjs';
import { DefaultRoles } from '@modules/auth/models/role';

@Component({
  selector: 'arf-aircrafts',
  templateUrl: './aircrafts.component.html',
  styleUrls: [ './aircrafts.component.scss' ]
})
export class AircraftsComponent implements OnInit {
  readonly DEFAULT_ROLES = DefaultRoles;
  readonly scrollbarOptions: ScrollbarOptions = {
    ...DEFAULT_SCROLLBAR_OPTIONS,
    overflowBehavior: {
      y: 'visible-hidden'
    }
  };
  readonly loading$: Observable<boolean>;
  readonly aircrafts$: Observable<AircraftResponse[]>;
  readonly aircraftState = AircraftRentalState;

  constructor(@Inject(REFRESH_AIRCRAFTS) private refresh: RefreshAircrafts) {
    this.loading$ = this.refresh.loading$;
    this.aircrafts$ = this.refresh.data$;
  }

  ngOnInit() {
    this.refresh.dispatch();
  }

  trackByAircraft(_: number, aircraftResponse: AircraftResponse) {
    return aircraftResponse.id;
  }
}

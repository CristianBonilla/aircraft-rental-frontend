import { Component, Inject, OnInit } from '@angular/core';
import { RefreshPassengers, REFRESH_PASSENGERS } from '@core/providers/refresh.provider';
import { Observable } from 'rxjs';
import { DEFAULT_SCROLLBAR_OPTIONS, ScrollbarOptions } from 'src/app/models/scrollbar';
import { PassengerResponse } from '@modules/passengers/models/passenger';

@Component({
  selector: 'arf-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: [ './passengers.component.scss' ]
})
export class PassengersComponent implements OnInit {
  readonly scrollbarOptions: ScrollbarOptions = {
    ...DEFAULT_SCROLLBAR_OPTIONS,
    overflowBehavior: {
      y: 'visible-hidden'
    }
  };
  readonly loading$: Observable<boolean>;
  readonly passengers$: Observable<PassengerResponse[]>;

  constructor(@Inject(REFRESH_PASSENGERS) private refresh: RefreshPassengers) {
    this.loading$ = this.refresh.loading$;
    this.passengers$ = this.refresh.data$;
  }

  ngOnInit() {
    this.refresh.dispatch();
  }

  trackByPassenger(_: number, passengerResponse: PassengerResponse) {
    return passengerResponse.id;
  }
}

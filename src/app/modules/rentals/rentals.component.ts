import { Component, Inject, OnInit } from '@angular/core';
import { RefreshRentals, REFRESH_RENTALS } from '@core/providers/refresh.provider';
import { RentalResponse } from '@modules/rentals/models/rental';
import { DEFAULT_SCROLLBAR_OPTIONS, ScrollbarOptions } from 'src/app/models/scrollbar';
import { Observable } from 'rxjs';

@Component({
  selector: 'arf-rentals',
  templateUrl: './rentals.component.html',
  styles: []
})
export class RentalsComponent implements OnInit {
  readonly loading$: Observable<boolean>;
  readonly rentals$: Observable<RentalResponse[]>;
  readonly scrollbarOptions: ScrollbarOptions = {
    ...DEFAULT_SCROLLBAR_OPTIONS,
    overflowBehavior: {
      y: 'visible-hidden'
    }
  };

  constructor(@Inject(REFRESH_RENTALS) private refresh: RefreshRentals) {
    this.loading$ = this.refresh.loading$;
    this.rentals$ = this.refresh.data$;
  }

  ngOnInit() {
    this.refresh.dispatch();
  }

  trackByRentals(_: number, rentalResponse: RentalResponse) {
    return rentalResponse.id;
  }
}

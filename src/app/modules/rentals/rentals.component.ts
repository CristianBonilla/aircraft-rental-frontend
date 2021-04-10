import { Component, Inject, OnInit } from '@angular/core';
import { RefreshRentals, REFRESH_RENTALS } from '@core/providers/refresh.provider';
import { Observable } from 'rxjs';
import { RentalResponse } from '@modules/rentals/models/rental';

@Component({
  selector: 'arf-rentals',
  templateUrl: './rentals.component.html',
  styles: []
})
export class RentalsComponent implements OnInit {
  readonly loading$: Observable<boolean>;
  readonly rentals$: Observable<RentalResponse[]>;

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

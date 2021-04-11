import { Pipe, PipeTransform } from '@angular/core';
import { AircraftResponse } from '@modules/aircrafts/models/aircraft';
import { RentalDisplay, RentalResponse } from '@modules/rentals/models/rental';
import { AircraftsService } from '@services/aircrafts/aircrafts.service';
import { combineLatest, Observable } from 'rxjs';
import { count, distinct, first, groupBy, map, mergeAll, mergeMap, take, toArray } from 'rxjs/operators';

@Pipe({
  name: 'rentalsDisplay'
})
export class RentalsDisplayPipe implements PipeTransform {
  constructor(private aircrafts: AircraftsService) { }

  transform(rentals$: Observable<RentalResponse[]>) {
    const rentalsDisplay$ = rentals$.pipe(
      take(1),
      mergeAll(),
      groupBy(rental => rental.aircraftId),
      mergeMap(group => combineLatest([
        group.pipe(first()),
        group.pipe(
          distinct(({ passengerId }) => passengerId),
          count()
        )
      ])),
      mergeMap(([ rental, passengersAmount ]) => this.getRentalDisplay(rental, passengersAmount)),
      toArray()
    );

    return rentalsDisplay$;
  }

  private getRentalDisplay(
    { aircraftId, location, arrivalDate, departureDate }: RentalResponse,
    passengersAmount: number
  ) {
    const rentalDisplay$ = this.aircrafts.fetchAircraftById(aircraftId).pipe(
      take(1),
      map<AircraftResponse, RentalDisplay>(aircraft => ({
        passengersAmount,
        aircraft,
        location,
        arrivalDate,
        departureDate
      }))
    );

    return rentalDisplay$;
  }
}

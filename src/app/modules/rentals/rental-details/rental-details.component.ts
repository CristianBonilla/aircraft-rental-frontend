import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AircraftsService } from '@services/aircrafts/aircrafts.service';
import { RentalsService } from '@services/rentals/rentals.service';
import { RentalDisplayDetail } from '@modules/rentals/models/rental';
import { DEFAULT_MODAL_OPTIONS } from 'src/app/models/modal';
import { APP_ROUTES } from 'src/app/models/routes';
import { count, defaultIfEmpty, distinct, filter, first, map, mergeAll, mergeMap, take, toArray } from 'rxjs/operators';
import { combineLatest, iif, of, throwError } from 'rxjs';
import { AircraftResponse } from '@modules/aircrafts/models/aircraft';

const { HOME: ROUTES } = APP_ROUTES;

@Component({
  selector: 'arf-rental-details',
  templateUrl: './rental-details.component.html',
  styles: []
})
export class RentalDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('rentalTemplate')
  readonly rentalTemplate: TemplateRef<NgbActiveModal>;
  private rentalModal: NgbModalRef;
  private aircraftId: string = null;
  rentalDisplayDetail: RentalDisplayDetail = null;

  constructor(
    private modal: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private aircrafts: AircraftsService,
    private rentals: RentalsService
  ) { }

  ngOnInit() {
    const { params: { aircraftId } } = this.route.snapshot;
    this.aircraftId = aircraftId;
  }

  ngAfterViewInit() {
    if (!this.aircraftId || !!this.aircraftId && !this.aircraftId.trim()) {
      this.giveBack();

      return;
    }
    this.getRentalDisplayDetail().subscribe(rentalDisplayDetail => {
      this.rentalDisplayDetail = rentalDisplayDetail;
      this.rentalModal = this.modal.open(this.rentalTemplate, DEFAULT_MODAL_OPTIONS);
      this.actionOnCompletion();
      this.onPopState();
    }, _ => this.giveBack());
  }

  close(active: NgbActiveModal) {
    active.close(null);
  }

  private getRentalDisplayDetail() {
    const rentals$ = this.fetchRentalsByAircraftId().pipe(mergeAll());
    const firstRental$ = rentals$.pipe(
      first(),
      defaultIfEmpty(null),
      mergeMap(rental => iif(() => !!rental,
        of(rental),
        throwError(null)
      ))
    );
    const passengersAmount$ = rentals$.pipe(
      distinct(({ passengerId }) => passengerId),
      count()
    );
    const passengers$ = rentals$.pipe(
      mergeMap(({ passengerId }) => this.fetchPassengerById(passengerId)),
      toArray()
    );
    const rentalDisplayDetail$ = combineLatest([
      firstRental$,
      passengersAmount$,
      passengers$
    ]).pipe(
      mergeMap(([ rental, passengersAmount, passengers ]) =>
        this.fetchAircraftById(rental.aircraftId).pipe(
          map<AircraftResponse, RentalDisplayDetail>(aircraft => ({
            ...rental,
            aircraft,
            passengersAmount,
            passengers
          }))
      )),
      take(1)
    );

    return rentalDisplayDetail$;
  }

  private fetchRentalsByAircraftId() {
    const rentals$ = this.rentals.fetchRentalsByAircraftId(this.aircraftId).pipe(take(1));

    return rentals$;
  }

  private fetchAircraftById(aircraftId: string) {
    const aircraft$ = this.aircrafts.fetchAircraftById(aircraftId).pipe(take(1));

    return aircraft$;
  }

  private fetchPassengerById(passengerId: string) {
    const passenger$ = this.rentals.fetchPassengerById(passengerId).pipe(take(1));

    return passenger$;
  }

  private actionOnCompletion() {
    this.rentalModal.hidden.pipe(take(1)).subscribe(_ => this.giveBack());
  }

  private giveBack() {
    this.router.navigate([ ROUTES.RENTALS.MAIN ]);
  }

  private onPopState() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart && event.navigationTrigger === 'popstate'),
      take(1)
    ).subscribe(_ => this.rentalModal.close(null));
  }
}

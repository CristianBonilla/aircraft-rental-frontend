import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { PassengerResponse } from '@modules/passengers/models/passenger';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RentalsService } from '@services/rentals/rentals.service';
import { of, throwError } from 'rxjs';
import { filter, mergeMap, take } from 'rxjs/operators';
import { DEFAULT_MODAL_OPTIONS } from 'src/app/models/modal';
import { APP_ROUTES } from 'src/app/models/routes';

const { HOME: ROUTES } = APP_ROUTES;

@Component({
  selector: 'arf-passenger-details',
  templateUrl: './passenger-details.component.html',
  styles: []
})
export class PassengerDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('passengerTemplate')
  readonly passengerTemplate: TemplateRef<NgbActiveModal>;
  private passengerModal: NgbModalRef = null;
  private passengerId: string | null = null;
  passenger: PassengerResponse = null;

  constructor(
    private modal: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private rentals: RentalsService
  ) { }

  ngOnInit() {
    const { params: { passengerId } } = this.route.snapshot;
    this.passengerId = passengerId;
  }

  ngAfterViewInit() {
    if (!this.passengerId || !!this.passengerId && !this.passengerId.trim()) {
      this.giveBack();

      return;
    }
    this.fetchPassenger().subscribe(passenger => {
      this.passenger = passenger;
      this.passengerModal = this.modal.open(this.passengerTemplate, DEFAULT_MODAL_OPTIONS);
      this.actionOnCompletion();
      this.onPopState();
    }, _ => this.giveBack());
  }

  close(active: NgbActiveModal) {
    active.close(null);
  }

  private fetchPassenger() {
    const passenger$ = this.rentals.fetchPassengerById(this.passengerId).pipe(
      mergeMap(passenger => !!passenger ? of(passenger) : throwError(null)),
      take(1)
    );

    return passenger$;
  }

  private actionOnCompletion() {
    this.passengerModal.hidden.pipe(take(1)).subscribe(_ => this.giveBack());
  }

  private giveBack() {
    this.router.navigate([ ROUTES.PASSENGERS.MAIN ]);
  }

  private onPopState() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart && !!event.restoredState),
      take(1)
    ).subscribe(_ => this.passengerModal.close(null));
  }
}

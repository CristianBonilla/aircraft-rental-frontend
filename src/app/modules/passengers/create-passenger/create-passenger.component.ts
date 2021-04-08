import { AfterViewInit, Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { RefreshPassengers, REFRESH_PASSENGERS } from '@core/providers/refresh.provider';
import { onlyLetters, onlyNumbers } from '@helpers/validators/formats.validator';
import { PassengerRequest, PassengerState } from '@modules/passengers/models/passenger';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RentalsService } from '@services/rentals/rentals.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { DEFAULT_MODAL_OPTIONS } from 'src/app/models/modal';
import { APP_ROUTES } from 'src/app/models/routes';

const { HOME: ROUTES } = APP_ROUTES;

@Component({
  selector: 'arf-create-passenger',
  templateUrl: './create-passenger.component.html',
  styles: []
})
export class CreatePassengerComponent implements AfterViewInit {
  @ViewChild('passengerTemplate')
  readonly passengerTemplate: TemplateRef<NgbActiveModal>;
  private passengerModal: NgbModalRef;
  private readonly loadingSubject = new BehaviorSubject(false);
  readonly loading$: Observable<boolean>;
  readonly passengerForm = this.formBuilder.group({
    identificationDocument: [ null ],
    firstName: [ null ],
    lastName: [ null ],
    specialty: [ null ]
  });

  get identificationDocument() {
    return this.passengerForm.get('identificationDocument');
  }

  get firstName() {
    return this.passengerForm.get('firstName');
  }

  get lastName() {
    return this.passengerForm.get('lastName');
  }

  get specialty() {
    return this.passengerForm.get('specialty');
  }

  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private router: Router,
    private rentals: RentalsService,
    @Inject(REFRESH_PASSENGERS) private refresh: RefreshPassengers
  ) {
    this.loading$ = this.loadingSubject.asObservable();
    this.identificationDocument.setValidators([
      Validators.required,
      Validators.minLength(3),
      onlyNumbers
    ]);
    this.firstName.setValidators([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      onlyLetters
    ]);
    this.lastName.setValidators([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      onlyLetters
    ]);
    this.specialty.setValidators([
      Validators.required,
      Validators.minLength(10)
    ]);
  }

  ngAfterViewInit() {
    this.passengerModal = this.modal.open(this.passengerTemplate, DEFAULT_MODAL_OPTIONS);
    this.actionOnCompletion();
    this.onPopState();
  }

  dismiss(active: NgbActiveModal) {
    active.dismiss(null);
  }

  createPassenger(active: NgbActiveModal) {
    this.loadingSubject.next(true);
    const passengerRequest: PassengerRequest = {
      identificationDocument: this.identificationDocument.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      specialty: this.specialty.value
    };
    this.rentals.createPassenger(passengerRequest).pipe(take(1))
      .subscribe(_ => active.close(PassengerState.CREATED));
  }

  private actionOnCompletion() {
    this.passengerModal.closed.pipe(
      take(1),
      filter<PassengerState>(state => state === PassengerState.CREATED)
    ).subscribe(_ => this.refresh.dispatch());
    this.passengerModal.hidden.pipe(take(1))
      .subscribe(_ => this.router.navigate([ ROUTES.PASSENGERS.MAIN ]));
  }

  private onPopState() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart && !!event.restoredState),
      take(1)
    ).subscribe(_ => this.passengerModal.close(null));
  }
}

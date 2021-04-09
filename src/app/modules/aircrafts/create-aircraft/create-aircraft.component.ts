import { AfterViewInit, Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RefreshAircrafts, REFRESH_AIRCRAFTS } from '@core/providers/refresh.provider';
import { AircraftRequest, AircraftRentalState, AircraftState } from '@modules/aircrafts/models/aircraft';
import { AircraftsService } from '@services/aircrafts/aircrafts.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { APP_ROUTES } from 'src/app/models/routes';
import { DEFAULT_MODAL_OPTIONS } from 'src/app/models/modal';

const { HOME: ROUTES } = APP_ROUTES;

@Component({
  selector: 'arf-create-aircraft',
  templateUrl: './create-aircraft.component.html',
  styles: []
})
export class CreateAircraftComponent implements AfterViewInit {
  @ViewChild('aircraftTemplate')
  readonly aircraftTemplate: TemplateRef<NgbActiveModal>;
  private aircraftModal: NgbModalRef;
  private readonly loadingSubject = new BehaviorSubject(false);
  readonly loading$: Observable<boolean>;
  readonly aircraftForm = this.formBuilder.group({
    name: [ null ],
    description: [ null ]
  });

  get name() {
    return this.aircraftForm.get('name');
  }

  get description() {
    return this.aircraftForm.get('description');
  }

  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private router: Router,
    private aircrafts: AircraftsService,
    @Inject(REFRESH_AIRCRAFTS) private refresh: RefreshAircrafts
  ) {
    this.loading$ = this.loadingSubject.asObservable();
    this.name.setValidators([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]);
    this.description.setValidators([
      Validators.minLength(10)
    ]);
  }

  ngAfterViewInit() {
    this.aircraftModal = this.modal.open(this.aircraftTemplate, DEFAULT_MODAL_OPTIONS);
    this.actionOnCompletion();
    this.onPopState();
  }

  createAircraft(active: NgbActiveModal) {
    this.loadingSubject.next(true);
    const aircraftRequest: AircraftRequest = {
      name: this.name.value,
      state: AircraftRentalState.NotRented,
      description: !!this.description.value ? this.description.value : null
    };
    this.aircrafts.createAircraft(aircraftRequest).pipe(take(1))
      .subscribe(_ => active.close(AircraftState.CREATED));
  }

  dismiss(active: NgbActiveModal) {
    active.dismiss(null);
  }

  private actionOnCompletion() {
    this.aircraftModal.closed.pipe(
      take(1),
      filter<AircraftState>(state => state === AircraftState.CREATED)
    ).subscribe(_ => this.refresh.dispatch());
    this.aircraftModal.hidden.pipe(take(1))
      .subscribe(_ => this.router.navigate([ ROUTES.AIRCRAFTS.MAIN ]));
  }

  private onPopState() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart && !!event.restoredState),
      take(1)
    ).subscribe(_ => this.aircraftModal.close(null));
  }
}

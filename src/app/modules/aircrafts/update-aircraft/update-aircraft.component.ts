import { AfterViewInit, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { RefreshAircrafts, REFRESH_AIRCRAFTS } from '@core/providers/refresh.provider';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AircraftsService } from '@services/aircrafts/aircrafts.service';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { filter, mergeMap, take } from 'rxjs/operators';
import { DEFAULT_MODAL_OPTIONS } from 'src/app/models/modal';
import { APP_ROUTES } from 'src/app/models/routes';
import { AircraftRentalState, AircraftRequest, AircraftResponse, AircraftState } from '@modules/aircrafts/models/aircraft';
import { CustomizeDropdownSelect, DropdownSelectStyle } from '@shared/components/dropdown-select';

const { HOME: ROUTES } = APP_ROUTES;

@Component({
  selector: 'arf-update-aircraft',
  templateUrl: './update-aircraft.component.html',
  styles: []
})
export class UpdateAircraftComponent implements OnInit, AfterViewInit {
  @ViewChild('aircraftTemplate')
  readonly aircraftTemplate: TemplateRef<NgbActiveModal>;
  private aircraftModal: NgbModalRef;
  private readonly loadingSubject = new BehaviorSubject(false);
  private aircraftId: string | null = null;
  readonly loading$: Observable<boolean>;
  readonly aircraftForm = this.formBuilder.group({
    id: [ null ],
    name: [ null ],
    state: [ null ],
    description: [ null ]
  });
  readonly dropdownStateSelect: CustomizeDropdownSelect = {
    data: [
      {
        value: AircraftRentalState.NotRented,
        text: 'No Alquilado'
      },
      {
        value: AircraftRentalState.Rented,
        text: 'Alquilado'
      }
    ],
    style: DropdownSelectStyle.Light,
    options: {
      noneSelectedText: 'Estado sin seleccionar...',
      size: 5
    }
  };
  aircraft: AircraftResponse = null;
  aircraftName: string = null;

  get id() {
    return this.aircraftForm.get('id');
  }

  get name() {
    return this.aircraftForm.get('name');
  }

  get state() {
    return this.aircraftForm.get('state');
  }

  get description() {
    return this.aircraftForm.get('description');
  }

  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private aircrafts: AircraftsService,
    @Inject(REFRESH_AIRCRAFTS) private refresh: RefreshAircrafts
  ) {
    this.loading$ = this.loadingSubject.asObservable();
    this.id.setValidators([ Validators.required ]);
    this.name.setValidators([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]);
    this.state.setValidators([
      Validators.required
    ]);
    this.description.setValidators([
      Validators.minLength(10)
    ]);
  }

  ngOnInit() {
    const { params: { aircraftId } } = this.route.snapshot;
    this.aircraftId = aircraftId;
  }

  ngAfterViewInit() {
    if (!this.aircraftId || !!this.aircraftId && !this.aircraftId.trim()) {
      this.giveBack();

      return;
    }
    this.fetchAircraft().subscribe(aircraft => {
      this.aircraft = aircraft;
      this.aircraftName = this.aircraft.name;
      this.aircraftModal = this.modal.open(this.aircraftTemplate, DEFAULT_MODAL_OPTIONS);
      this.updateFormFields();
      this.actionOnCompletion();
      this.onPopState();
    }, _ => this.giveBack());
  }

  updateAircraft(active: NgbActiveModal) {
    this.loadingSubject.next(true);
    const aircraftRequest: AircraftRequest = {
      name: this.name.value,
      state: this.state.value,
      description: this.description.value
    };
    this.aircrafts.updateAircraft(this.aircraftId, aircraftRequest).pipe(take(1))
      .subscribe(_ => active.close(AircraftState.UPDATED));
  }

  dismiss(active: NgbActiveModal) {
    active.dismiss(null);
  }

  private fetchAircraft() {
    const aircraft$ = this.aircrafts.fetchAircraftById(this.aircraftId).pipe(
      mergeMap(aircraft => !!aircraft ? of(aircraft) : throwError(null)),
      take(1)
    );

    return aircraft$;
  }

  private updateFormFields() {
    this.id.setValue(this.aircraftId);
    this.name.setValue(this.aircraftName);
    this.state.setValue(this.aircraft.state);
    this.state.disable();
    this.description.setValue(this.aircraft.description);
  }

  private actionOnCompletion() {
    this.aircraftModal.closed.pipe(
      take(1),
      filter<AircraftState>(state => state === AircraftState.UPDATED)
    ).subscribe(_ => this.refresh.dispatch());
    this.aircraftModal.hidden.pipe(take(1))
      .subscribe(_ => this.router.navigate([ ROUTES.AIRCRAFTS.MAIN ]));
  }

  private giveBack() {
    this.router.navigate([ ROUTES.AIRCRAFTS.MAIN ]);
  }

  private onPopState() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart && event.navigationTrigger === 'popstate'),
      take(1)
    ).subscribe(_ => this.aircraftModal.close(null));
  }
}

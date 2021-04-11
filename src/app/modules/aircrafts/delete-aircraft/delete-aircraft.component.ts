import { AfterViewInit, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AircraftResponse, AircraftState } from '@modules/aircrafts/models/aircraft';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { RefreshAircrafts, REFRESH_AIRCRAFTS } from '@core/providers/refresh.provider';
import { AircraftsService } from '@services/aircrafts/aircrafts.service';
import { APP_ROUTES } from 'src/app/models/routes';
import { filter, mergeMap, take } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { DEFAULT_MODAL_OPTIONS } from 'src/app/models/modal';

const { HOME: ROUTES } = APP_ROUTES;

@Component({
  selector: 'arf-delete-aircraft',
  templateUrl: './delete-aircraft.component.html',
  styles: []
})
export class DeleteAircraftComponent implements OnInit, AfterViewInit {
  @ViewChild('aircraftTemplate')
  readonly aircraftTemplate: TemplateRef<NgbActiveModal>;
  private aircraftModal: NgbModalRef;
  private loadingSubject = new BehaviorSubject(false);
  readonly loading$: Observable<boolean>;
  readonly aircraftForm: FormGroup;
  aircraftId: string | null = null;
  aircraft: AircraftResponse = null;

  get id() {
    return this.aircraftForm.get('id');
  }

  constructor(
    private modal: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private aircrafts: AircraftsService,
    @Inject(REFRESH_AIRCRAFTS) private refresh: RefreshAircrafts
  ) {
    this.loading$ = this.loadingSubject.asObservable();
    this.aircraftForm = new FormGroup({
      id: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    const { params: { aircraftId } } = this.route.snapshot;
    this.aircraftId = aircraftId;
    this.id.setValue(this.aircraftId);
  }

  ngAfterViewInit() {
    if (!this.aircraftId || !!this.aircraftId && !this.aircraftId.trim()) {
      this.giveBack();

      return;
    }
    this.fetchAircraft().subscribe(aircraft => {
      this.aircraft = aircraft;
      this.aircraftModal = this.modal.open(this.aircraftTemplate, DEFAULT_MODAL_OPTIONS);
      this.actionOnCompletion();
      this.onPopState();
    }, _ => this.giveBack());
  }

  deleteAircraft(active: NgbActiveModal) {
    this.loadingSubject.next(true);
    this.aircrafts.deleteAircraft(this.aircraftId).pipe(take(1))
      .subscribe(_ => active.close(AircraftState.DELETED));
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

  private actionOnCompletion() {
    this.aircraftModal.closed.pipe(
      take(1),
      filter<AircraftState>(state => state === AircraftState.DELETED)
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

  private giveBack() {
    this.router.navigate([ ROUTES.AIRCRAFTS.MAIN ]);
  }
}

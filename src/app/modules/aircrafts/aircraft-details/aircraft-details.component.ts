import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { AircraftRentalState, AircraftResponse } from '@modules/aircrafts/models/aircraft';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AircraftsService } from '@services/aircrafts/aircrafts.service';
import { of, throwError } from 'rxjs';
import { filter, mergeMap, take } from 'rxjs/operators';
import { DEFAULT_MODAL_OPTIONS } from 'src/app/models/modal';
import { APP_ROUTES } from 'src/app/models/routes';

const { HOME: ROUTES } = APP_ROUTES;

@Component({
  selector: 'arf-aircraft-details',
  templateUrl: './aircraft-details.component.html',
  styles: []
})
export class AircraftDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('aircraftTemplate')
  readonly aircraftTemplate: TemplateRef<NgbActiveModal>;
  private aircraftModal: NgbModalRef = null;
  private aircraftId: string | null = null;
  readonly aircraftState = AircraftRentalState;
  aircraft: AircraftResponse = null;

  constructor(
    private modal: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private aircrafts: AircraftsService
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
    this.fetchAircraft().subscribe(aircraft => {
      this.aircraft = aircraft;
      this.aircraftModal = this.modal.open(this.aircraftTemplate, DEFAULT_MODAL_OPTIONS);
      this.actionOnCompletion();
      this.onPopState();
    }, _ => this.giveBack());
  }

  close(active: NgbActiveModal) {
    active.close(null);
  }

  private fetchAircraft() {
    const aircraft$ = this.aircrafts.fetchAircraftById(this.aircraftId).pipe(
      mergeMap(aircraft => !!aircraft ? of(aircraft) : throwError(null)),
      take(1)
    );

    return aircraft$;
  }

  private actionOnCompletion() {
    this.aircraftModal.hidden.pipe(take(1)).subscribe(_ => this.giveBack());
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

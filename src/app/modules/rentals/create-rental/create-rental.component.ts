import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomizeDropdownSelect, DropdownSelectStyle } from '@shared/components/dropdown-select';
import { requiredMultiValidator } from '@helpers/validators/custom.validator';
import { AircraftRentalState } from '@modules/aircrafts/models/aircraft';
import { RentalRequest } from '@modules/rentals/models/rental';
import { AircraftsService } from '@services/aircrafts/aircrafts.service';
import { RentalsService } from '@services/rentals/rentals.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { count, mergeAll, take, tap } from 'rxjs/operators';

@Component({
  selector: 'arf-create-rental',
  templateUrl: './create-rental.component.html',
  styleUrls: [ './create-rental.component.scss' ]
})
export class CreateRentalComponent {
  @Output() refresh: EventEmitter<boolean> = new EventEmitter(false);
  private readonly currentDate = new Date();
  private readonly loadingSubject = new BehaviorSubject(false);
  readonly loading$: Observable<boolean>;
  readonly rentalForm = this.formBuilder.group({
    passengerId: [ [] ],
    aircraftId: [ null ],
    location: [ null ],
    departureDate: [ null ],
    arrivalDate: [ null ]
  });
  private readonly rentalFormDefaultValues = this.rentalForm.value;
  readonly dropdownPassengersSelect: CustomizeDropdownSelect = {
    data: [],
    style: DropdownSelectStyle.Info,
    options: {
      noneSelectedText: 'No hay pasajeros seleccionados...',
      selectedTextFormat: 'count > 2',
      countSelectedText: '{0} Pasajeros seleccionados',
      size: 5,
      liveSearch: true
    }
  };
  readonly dropdownAircraftSelect: CustomizeDropdownSelect = {
    data: [],
    style: DropdownSelectStyle.Info,
    options: {
      noneSelectedText: 'No hay un aeronave seleccionado...',
      size: 5
    }
  };

  get passengerId() {
    return this.rentalForm.get('passengerId');
  }

  get aircraftId() {
    return this.rentalForm.get('aircraftId');
  }

  get location() {
    return this.rentalForm.get('location');
  }

  get departureDate() {
    return this.rentalForm.get('departureDate');
  }

  get arrivalDate() {
    return this.rentalForm.get('arrivalDate');
  }

  get rentalFormValid() {
    return this.rentalForm.valid && this.arrivalDate.enable && this.departureDate.enable;
  }

  get minDepartureDate(): NgbDateStruct {

    return {
      year: this.currentDate.getFullYear(),
      month: this.currentDate.getMonth() + 1,
      day: this.currentDate.getDate()
    };
  }

  get minArrivalDate(): NgbDateStruct {
    if (this.departureDate.valid) {
      const { year, month, day }: NgbDateStruct = this.departureDate.value;

      return { year: year + 1, month, day };
    }

    return {
      year: this.currentDate.getFullYear() + 1,
      month: 1,
      day: 1
    };
  }

  constructor(
    private formBuilder: FormBuilder,
    private aircrafts: AircraftsService,
    private rentals: RentalsService
  ) {
    this.loading$ = this.loadingSubject.asObservable();
    this.passengerId.setValidators([ requiredMultiValidator ]);
    this.aircraftId.setValidators([ Validators.required ]);
    this.location.setValidators([
      Validators.required,
      Validators.minLength(5)
    ]);
    this.departureDate.setValidators([ Validators.required ]);
    this.arrivalDate.setValidators([ Validators.required ]);
    this.dropdownPassengerItems();
    this.dropdownAircraftItems();
    this.changeDropdownStyle(this.passengerId, this.dropdownPassengersSelect);
    this.changeDropdownStyle(this.aircraftId, this.dropdownAircraftSelect);
  }

  createRental() {
    this.loadingSubject.next(true);
    const arrivalDate: NgbDateStruct = this.arrivalDate.value;
    const departureDate: NgbDateStruct = this.departureDate.value;
    const rentalRequest: RentalRequest = {
      passengerIDs: this.passengerId.value,
      aircraftId: this.aircraftId.value,
      location: this.location.value,
      departureDate: new Date(
        departureDate.year,
        departureDate.month - 1,
        departureDate.day
      ).toISOString(),
      arrivalDate: new Date(
        arrivalDate.year,
        arrivalDate.month - 1,
        arrivalDate.day,
        11,
        59,
        59
      ).toISOString()
    };
    this.rentals.createRental(rentalRequest).pipe(take(1))
      .subscribe(_ => {
        this.refresh.emit(true);
        this.loadingSubject.next(false);
        this.resetForm();
      });
  }

  private dropdownPassengerItems() {
    const passengerItems = this.dropdownPassengersSelect.data;
    this.rentals.fetchPassengersNotAvailable().pipe(
      take(1),
      mergeAll(),
      tap(({ id, identificationDocument, firstName, lastName }) => passengerItems.push({
        value: id,
        text: `${ identificationDocument }, ${ firstName } ${ lastName }`
      })),
      count()
    ).subscribe(length => {
      if (!length) {
        this.passengerId.disable();
      }
    });
  }

  private dropdownAircraftItems() {
    const aircraftItems = this.dropdownAircraftSelect.data;
    this.aircrafts.fetchAircraftsByState(AircraftRentalState.NotRented).pipe(
      take(1),
      mergeAll(),
      tap(({ id, name }) => aircraftItems.push({
        value: id,
        text: name
      })),
      count()
    ).subscribe(length => {
      if (!length) {
        this.aircraftId.disable();
      }
    });
  }

  private changeDropdownStyle(
    control: AbstractControl,
    dropdownSelect: CustomizeDropdownSelect,
    original = DropdownSelectStyle.Info
  ) {
    control.valueChanges.subscribe(() => {
      const { invalid, dirty, touched } = control;
      if (invalid && (dirty || touched)) {
        dropdownSelect.style = DropdownSelectStyle.Danger;

        return;
      }
      dropdownSelect.style = original;
    });
  }

  private resetForm() {
    this.rentalForm.reset(this.rentalFormDefaultValues);
    this.dropdownPassengersSelect.data = [];
    this.dropdownAircraftSelect.data = [];
    this.dropdownPassengerItems();
    this.dropdownAircraftItems();
  }
}

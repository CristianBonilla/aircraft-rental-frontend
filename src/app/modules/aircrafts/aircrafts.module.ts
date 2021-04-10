import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AircraftsRoutingModule } from '@modules/aircrafts/aircrafts-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IconsModule } from '@shared/icons/icons.module';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { DropdownSelectModule } from '@shared/components/dropdown-select/dropdown-select.module';
import { DirectivesModule } from '@directives/directives.module';

import { AircraftsComponent } from '@modules/aircrafts/aircrafts.component';
import { CreateAircraftComponent } from '@modules/aircrafts/create-aircraft/create-aircraft.component';
import { AircraftDetailsComponent } from '@modules/aircrafts/aircraft-details/aircraft-details.component';
import { UpdateAircraftComponent } from '@modules/aircrafts/update-aircraft/update-aircraft.component';
import { DeleteAircraftComponent } from '@modules/aircrafts/delete-aircraft/delete-aircraft.component';

@NgModule({
  declarations: [
    AircraftsComponent,
    CreateAircraftComponent,
    AircraftDetailsComponent,
    UpdateAircraftComponent,
    DeleteAircraftComponent
  ],
  imports: [
    CommonModule,
    AircraftsRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    IconsModule,
    OverlayscrollbarsModule,
    NgxTrimDirectiveModule,
    DropdownSelectModule,
    DirectivesModule
  ]
})
export class AircraftsModule { }

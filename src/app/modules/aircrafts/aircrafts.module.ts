import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AircraftsRoutingModule } from '@modules/aircrafts/aircrafts-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@shared/icons/icons.module';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { DirectivesModule } from '@directives/directives.module';

import { AircraftsComponent } from '@modules/aircrafts/aircrafts.component';
import { CreateAircraftComponent } from '@modules/aircrafts/create-aircraft/create-aircraft.component';

@NgModule({
  declarations: [
    AircraftsComponent,
    CreateAircraftComponent
  ],
  imports: [
    CommonModule,
    AircraftsRoutingModule,
    ReactiveFormsModule,
    IconsModule,
    OverlayscrollbarsModule,
    NgxTrimDirectiveModule,
    DirectivesModule
  ]
})
export class AircraftsModule { }

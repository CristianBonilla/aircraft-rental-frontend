import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassengersRoutingModule } from '@modules/passengers/passengers-routing.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IconsModule } from '@shared/icons/icons.module';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '@directives/directives.module';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';

import { PassengersComponent } from '@modules/passengers/passengers.component';
import { CreatePassengerComponent } from '@modules/passengers/create-passenger/create-passenger.component';
import { PassengerDetailsComponent } from '@modules/passengers/passenger-details/passenger-details.component';

@NgModule({
  declarations: [
    PassengersComponent,
    CreatePassengerComponent,
    PassengerDetailsComponent
  ],
  imports: [
    CommonModule,
    PassengersRoutingModule,
    NgxPermissionsModule,
    NgbModule,
    IconsModule,
    OverlayscrollbarsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgxTrimDirectiveModule
  ]
})
export class PassengersModule { }

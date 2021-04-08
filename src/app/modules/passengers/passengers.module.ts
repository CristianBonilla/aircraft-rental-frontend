import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassengersRoutingModule } from '@modules/passengers/passengers-routing.module';
import { PassengersComponent } from '@modules/passengers/passengers.component';
import { IconsModule } from '@shared/icons/icons.module';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '@directives/directives.module';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';

import { CreatePassengerComponent } from '@modules/passengers/create-passenger/create-passenger.component';

@NgModule({
  declarations: [
    PassengersComponent,
    CreatePassengerComponent
  ],
  imports: [
    CommonModule,
    PassengersRoutingModule,
    IconsModule,
    OverlayscrollbarsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgxTrimDirectiveModule
  ]
})
export class PassengersModule { }

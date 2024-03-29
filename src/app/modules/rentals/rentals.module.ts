import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalsRoutingModule } from '@modules/rentals/rentals-routing.module';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IconsModule } from '@shared/icons/icons.module';
import { DirectivesModule } from '@directives/directives.module';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { DropdownSelectModule } from '@shared/components/dropdown-select/dropdown-select.module';

import { RentalsComponent } from '@modules/rentals/rentals.component';
import { CreateRentalComponent } from '@modules/rentals/create-rental/create-rental.component';
import { RentalDetailsComponent } from '@modules/rentals/rental-details/rental-details.component';

import { RentalsDisplayPipe } from '@modules/rentals/pipes/rentals-display/rentals-display.pipe';

@NgModule({
  declarations: [
    RentalsComponent,
    RentalsDisplayPipe,
    CreateRentalComponent,
    RentalDetailsComponent
  ],
  imports: [
    CommonModule,
    RentalsRoutingModule,
    OverlayscrollbarsModule,
    ReactiveFormsModule,
    NgxPermissionsModule,
    NgbModule,
    IconsModule,
    DirectivesModule,
    NgxTrimDirectiveModule,
    DropdownSelectModule
  ]
})
export class RentalsModule { }

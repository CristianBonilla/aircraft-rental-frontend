import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { RentalsRoutingModule } from '@modules/rentals/rentals-routing.module';
import { IconsModule } from '@shared/icons/icons.module';

import { RentalsComponent } from '@modules/rentals/rentals.component';

import { RentalsDisplayPipe } from '@modules/rentals/pipes/rentals-display/rentals-display.pipe';

@NgModule({
  declarations: [
    RentalsComponent,
    RentalsDisplayPipe
  ],
  imports: [
    CommonModule,
    RentalsRoutingModule,
    OverlayscrollbarsModule,
    IconsModule
  ]
})
export class RentalsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalsRoutingModule } from '@modules/rentals/rentals-routing.module';
import { RentalsComponent } from '@modules/rentals/rentals.component';

@NgModule({
  declarations: [
    RentalsComponent
  ],
  imports: [
    CommonModule,
    RentalsRoutingModule
  ]
})
export class RentalsModule { }
